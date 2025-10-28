import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, userData: any) => Promise<void>
  signIn: (email: string, password: string) => Promise<User | null>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const adminEmails = useMemo(
    () =>
      (import.meta.env.VITE_ADMIN_EMAILS || '')
        .split(',')
        .map((email: string) => email.trim().toLowerCase())
        .filter(Boolean),
    []
  )
  const fallbackAdmin = useMemo(() => {
    const password = import.meta.env.VITE_ADMIN_LOCAL_PASSWORD?.trim() || ''
    const email = adminEmails[0] || ''
    return email && password ? { email, password } : null
  }, [adminEmails])

  const createLocalAdminUser = (email: string): User => {
    const now = new Date().toISOString()
    return {
      id: `local-admin-${email}`,
      email,
      phone: '',
      app_metadata: { provider: 'local-admin', role: 'admin', is_admin: true },
      user_metadata: { role: 'admin', is_admin: true },
      aud: 'authenticated',
      created_at: now,
      confirmed_at: now,
      email_confirmed_at: now,
      phone_confirmed_at: null,
      last_sign_in_at: now,
      role: 'authenticated',
      identities: [],
      factors: [],
      factor_ids: [],
      raw_app_meta_data: { provider: 'local-admin', role: 'admin', is_admin: true },
      raw_user_meta_data: { role: 'admin', is_admin: true },
      is_anonymous: false,
    } as unknown as User
  }

  const ensureUserProfile = useCallback(async (nextUser: User | null) => {
    if (!nextUser) return
    if ((nextUser.app_metadata?.provider as string | undefined) === 'local-admin') return

    try {
      const { data: existing, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('id', nextUser.id)
        .maybeSingle()

      if (fetchError) {
        console.error('Erreur lors de la récupération du profil utilisateur:', fetchError.message)
        return
      }

      if (!existing) {
        const fullName =
          (nextUser.user_metadata?.full_name as string | undefined) ??
          (nextUser.user_metadata?.name as string | undefined) ??
          null
        let prenom =
          (nextUser.user_metadata?.given_name as string | undefined) ??
          null
        let nom =
          (nextUser.user_metadata?.family_name as string | undefined) ??
          null

        if (!prenom && fullName) {
          const [first, ...rest] = fullName.split(' ')
          prenom = first ?? null
          nom = rest.length ? rest.join(' ') : nom
        }

        const profilePayload = {
          id: nextUser.id,
          email: nextUser.email ?? '',
          prenom,
          nom,
          role: adminEmails.includes((nextUser.email ?? '').toLowerCase()) ? 'admin' : 'client',
        }

        const { error: insertError } = await supabase.from('users').insert(profilePayload)
        if (insertError && insertError.code !== '23505') {
          console.error('Erreur lors de la création du profil utilisateur:', insertError.message)
        }
      }
    } catch (err) {
      console.error('Impossible de synchroniser le profil utilisateur:', err)
    }
  }, [adminEmails])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
      if (session?.user) {
        void ensureUserProfile(session.user)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        void ensureUserProfile(session.user)
      }
    })

    return () => subscription.unsubscribe()
  }, [ensureUserProfile])

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    
    if (data.user) {
      const normalizedEmail = (data.user.email ?? '').toLowerCase()
      const profilePayload = {
        id: data.user.id,
        email: data.user.email,
        role: adminEmails.includes(normalizedEmail) ? 'admin' : 'client',
        ...userData
      }
      const { error: insertError } = await supabase.from('users').insert(profilePayload)
      if (insertError && insertError.code !== '23505') {
        throw insertError
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (
      fallbackAdmin &&
      normalizedEmail === fallbackAdmin.email &&
      password === fallbackAdmin.password
    ) {
      const localUser = createLocalAdminUser(normalizedEmail)
      setUser(localUser)
      return localUser
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    })

    if (error) {
      if (
        fallbackAdmin &&
        normalizedEmail === fallbackAdmin.email &&
        password === fallbackAdmin.password
      ) {
        const localUser = createLocalAdminUser(normalizedEmail)
        setUser(localUser)
        return localUser
      }
      throw error
    }

    if (data.user) {
      setUser(data.user)
    }

    return data.user ?? null
  }

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/espace-client/dashboard'
      }
    })
    if (error) throw error

    if (data?.url) {
      window.location.href = data.url
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error && error.message !== 'Not logged in') {
      console.warn('signOut error (ignored):', error.message)
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
