import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const EspaceClient = lazy(() => import("./pages/EspaceClient"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MesContrats = lazy(() => import("./pages/MesContrats"));
const MesDocuments = lazy(() => import("./pages/MesDocuments"));
const MonProfil = lazy(() => import("./pages/MonProfil"));
const AssuranceMoto = lazy(() => import("./pages/AssuranceMoto"));
const AssuranceAuto = lazy(() => import("./pages/AssuranceAuto"));
const AssuranceHabitation = lazy(() => import("./pages/AssuranceHabitation"));
const AssuranceSante = lazy(() => import("./pages/AssuranceSante"));
const AssurancePrevoyance = lazy(() => import("./pages/AssurancePrevoyance"));

function App() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espace-client" element={<EspaceClient />} />
          
          {/* Protected Routes */}
          <Route path="/espace-client/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/espace-client/contrats" element={<ProtectedRoute><MesContrats /></ProtectedRoute>} />
          <Route path="/espace-client/documents" element={<ProtectedRoute><MesDocuments /></ProtectedRoute>} />
          <Route path="/espace-client/profil" element={<ProtectedRoute><MonProfil /></ProtectedRoute>} />
          
          {/* Insurance Pages */}
          <Route path="/iard/moto" element={<AssuranceMoto />} />
          <Route path="/iard/auto" element={<AssuranceAuto />} />
          <Route path="/iard/habitation" element={<AssuranceHabitation />} />
          <Route path="/particuliers/sante" element={<AssuranceSante />} />
          <Route path="/particuliers/prevoyance" element={<AssurancePrevoyance />} />
        </Routes>
      </Suspense>
      
      <ChatWidget />
    </>
  );
}

export default App;