import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

/* ===== Lazy Pages - Espace Client ===== */
const EspaceClient = lazy(() => import("./pages/EspaceClient"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MesContrats = lazy(() => import("./pages/MesContrats"));
const MesDocuments = lazy(() => import("./pages/MesDocuments"));
const MonProfil = lazy(() => import("./pages/MonProfil"));

/* ===== Lazy Pages - Assurances ===== */
const AssuranceMoto = lazy(() => import("./pages/AssuranceMoto"));
const AssuranceAuto = lazy(() => import("./pages/AssuranceAuto"));
const AssuranceHabitation = lazy(() => import("./pages/AssuranceHabitation"));
const AssuranceSante = lazy(() => import("./pages/AssuranceSante"));
const AssurancePrevoyance = lazy(() => import("./pages/AssurancePrevoyance"));

/* ===== Lazy Pages - Informations publiques ===== */
const QuiSommesNous = lazy(() => import("./pages/QuiSommesNous"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Contact = lazy(() => import("./pages/Contact"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const CGU = lazy(() => import("./pages/CGU"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Accessibilite = lazy(() => import("./pages/Accessibilite"));

/* ===== Lazy Pages - Blog ===== */
const Actualites = lazy(() => import("./pages/Actualites"));
const Article = lazy(() => import("./pages/Article"));

/* ===== Lazy Page - 404 ===== */
const NotFound = lazy(() => import("./pages/NotFound"));

/* ===== APP ===== */
function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
          </div>
        }
      >
        <Routes>
          {/* Layout global avec Header + Footer */}
          <Route element={<Layout />}>
            {/* ==== Pages Publiques ==== */}
            <Route path="/" element={<Home />} />
            <Route path="/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/accessibilite" element={<Accessibilite />} />

            {/* ==== Blog ==== */}
            <Route path="/actualites" element={<Actualites />} />
            <Route path="/actualites/:slug" element={<Article />} />

            {/* ==== Espace Client ==== */}
            <Route path="/espace-client" element={<EspaceClient />} />
            <Route
              path="/espace-client/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/espace-client/contrats"
              element={
                <ProtectedRoute>
                  <MesContrats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/espace-client/documents"
              element={
                <ProtectedRoute>
                  <MesDocuments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/espace-client/profil"
              element={
                <ProtectedRoute>
                  <MonProfil />
                </ProtectedRoute>
              }
            />

            {/* ==== Assurances ==== */}
            <Route path="/iard/moto" element={<AssuranceMoto />} />
            <Route path="/iard/auto" element={<AssuranceAuto />} />
            <Route path="/iard/habitation" element={<AssuranceHabitation />} />
            <Route path="/particuliers/sante" element={<AssuranceSante />} />
            <Route path="/particuliers/prevoyance" element={<AssurancePrevoyance />} />

            {/* ==== Page non trouvée ==== */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;