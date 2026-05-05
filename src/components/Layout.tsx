import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div
        className="h-10 w-10 rounded-full border-2 border-teal-500/30 border-t-teal-500 animate-spin"
        aria-label="Chargement"
      />
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip link a11y */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3
                   focus:bg-slate-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Aller au contenu
      </a>

      <Header />

      {/* Pages garde leur background (hero plein écran, etc.) */}
      <main id="content" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}
