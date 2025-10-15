import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ChatWidget from "./components/ChatWidget";

// Lazy load pages
const EspaceClient = lazy(() => import("./pages/EspaceClient"));

function App() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/espace-client" element={<EspaceClient />} />
          <Route path="/devis" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/faq" element={<Home />} />
          <Route path="/actualites" element={<Home />} />
          <Route path="/animaux" element={<Home />} />
          <Route path="/particuliers/sante" element={<Home />} />
          <Route path="/particuliers/prevoyance" element={<Home />} />
          <Route path="/particuliers/iard" element={<Home />} />
          <Route path="/pro/sante-tns" element={<Home />} />
          <Route path="/pro/prevoyance-pro" element={<Home />} />
          <Route path="/iard/auto" element={<Home />} />
          <Route path="/iard/habitation" element={<Home />} />
        </Routes>
      </Suspense>
      
      {/* Chat Widget sur toutes les pages */}
      <ChatWidget />
    </>
  );
}

export default App;