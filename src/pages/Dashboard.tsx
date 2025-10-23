import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'
import { FileText, FolderOpen, MessageSquare, Home, User, LogOut, Shield } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { isAdminUser } from '@/components/AdminRoute'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState({ contrats: 0, documents: 0, demandes: 0 })
  const [contrats, setContrats] = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const isAdmin = isAdminUser(user)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    const { data: contratsData } = await supabase
      .from('contrats')
      .select('*')
      .eq('user_id', user?.id)
      .eq('statut', 'actif')

    const { data: documentsData } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(6)

    setStats({
      contrats: contratsData?.length || 0,
      documents: documentsData?.length || 0,
      demandes: 1
    })
    setContrats(contratsData || [])
    setDocuments(documentsData || [])
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center">
              {user?.email?.[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link to="/espace-client/dashboard" className="flex items-center gap-3 px-4 py-3 bg-orange-600 rounded-lg">
              <Home className="w-5 h-5" />
              <span>Tableau de bord</span>
            </Link>
            <Link to="/espace-client/contrats" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Mes contrats</span>
            </Link>
            <Link to="/espace-client/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <FolderOpen className="w-5 h-5" />
              <span>Mes documents</span>
            </Link>
            <Link to="/espace-client/profil" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <User className="w-5 h-5" />
              <span>Mon profil</span>
            </Link>
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
                <Shield className="w-5 h-5" />
                <span>Espace admin</span>
              </Link>
            )}
            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg w-full text-left">
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-teal-100 rounded-xl p-6">
            <FileText className="w-12 h-12 text-teal-600 mb-4" />
            <p className="text-4xl font-bold mb-2">{stats.contrats}</p>
            <p className="text-gray-700">Contrats actifs</p>
          </div>
          <div className="bg-cyan-100 rounded-xl p-6">
            <FolderOpen className="w-12 h-12 text-cyan-600 mb-4" />
            <p className="text-4xl font-bold mb-2">{stats.documents}</p>
            <p className="text-gray-700">Documents</p>
          </div>
          <div className="bg-blue-100 rounded-xl p-6">
            <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
            <p className="text-4xl font-bold mb-2">{stats.demandes}</p>
            <p className="text-gray-700">Demandes en cours</p>
          </div>
        </div>

        {/* Contracts Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Mes contrats en cours</h2>
          {contrats.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Type</th>
                    <th className="text-left py-3">N° contrat</th>
                    <th className="text-left py-3">Échéance</th>
                    <th className="text-left py-3">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {contrats.map((contrat) => (
                    <tr key={contrat.id} className="border-b">
                      <td className="py-3">{contrat.type}</td>
                      <td className="py-3">{contrat.numero_contrat}</td>
                      <td className="py-3">{new Date(contrat.date_fin).toLocaleDateString()}</td>
                      <td className="py-3">{contrat.montant}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Aucun contrat actif</p>
          )}
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Mes documents récents</h2>
          {documents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="border rounded-lg p-4">
                  <FileText className="w-8 h-8 text-orange-600 mb-2" />
                  <p className="font-semibold">{doc.nom}</p>
                  <p className="text-sm text-gray-500">{new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Aucun document</p>
          )}
        </div>
      </main>
    </div>
  )
}
