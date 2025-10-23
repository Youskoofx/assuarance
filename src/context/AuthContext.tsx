import { createContext, useContext, useEffect, useMemo, useState } from 'react'
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
  const fallbackAdmin = useMemo(() => {
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
      .split(',')
      .map((email: string) => email.trim().toLowerCase())
      .filter(Boolean)
    const password = import.meta.env.VITE_ADMIN_LOCAL_PASSWORD?.trim() || ''
    const email = adminEmails[0] || ''
    return email && password ? { email, password } : null
  }, [])

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: any) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    
    if (data.user) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email,
        ...userData
      })
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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/espace-client/dashboard'
      }
    })
    if (error) throw error
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
