import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ChatWidget from "./ChatWidget";

export default function Layout() {
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

      {/* Laisse les pages définir leur background (hero plein écran, etc.) */}
      <main id="content" className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
}