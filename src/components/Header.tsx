import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, UserCircle, ArrowRight } from "lucide-react";

const TOP_THRESHOLD = 120; // px avant d’activer le fond blanc

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const raf = useRef<number>();
  const location = useLocation();

  // Reset à chaque changement de page
  useEffect(() => {
    setOpen(false);
    setDropdown(null);
    lastY.current = window.scrollY;
    setAtTop(window.scrollY < TOP_THRESHOLD);
    setVisible(true);
  }, [location.pathname]);

  // Gestion du scroll (effet Twitter)
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const goingUp = curr < lastY.current - 2;
        const goingDown = curr > lastY.current + 2;

        setAtTop(curr < TOP_THRESHOLD);
        if (goingUp) setVisible(true);
        else if (goingDown) setVisible(false);

        lastY.current = curr;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const menu = {
    Particuliers: [
      { label: "Santé", path: "/particuliers/sante" },
      { label: "Prévoyance", path: "/particuliers/prevoyance" },
      { label: "IARD", path: "/particuliers/iard" },
    ],
    Pro: [
      { label: "Santé TNS", path: "/pro/sante-tns" },
      { label: "Prévoyance Pro", path: "/pro/prevoyance-pro" },
      { label: "RC Pro", path: "/pro/rc-pro" },
      { label: "Multirisque Pro", path: "/pro/multirisque" },
      { label: "Flotte Auto", path: "/pro/flotte-auto" },
    ],
  };

  const links = [
    { label: "Accueil", path: "/" },
    { label: "Animaux", path: "/animaux" },
    { label: "Actualités", path: "/actualites" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ];

  const solid = !atTop;

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "will-change-transform",
        visible ? "translate-y-0" : "-translate-y-full",
        solid
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.08)] border-none"
          : "bg-transparent border-none",
      ].join(" ")}
      style={{ transform: "translateZ(0)" }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/image.png"
              alt="Prévoyance Services"
              className={`h-[90px] md:h-[110px] w-auto object-contain transition-all ${
                solid ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-1">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`px-4 py-2 text-lg font-semibold transition-colors ${
                  solid ? "text-slate-900 hover:text-teal-600" : "text-white hover:text-teal-300"
                }`}
              >
                {l.label}
              </Link>
            ))}

            {/* Dropdowns */}
            {Object.entries(menu).map(([group, items]) => (
              <div
                key={group}
                className="relative"
                onMouseEnter={() => setDropdown(group)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  className={`flex items-center gap-1 px-4 py-2 text-lg font-semibold transition-colors ${
                    solid ? "text-slate-900 hover:text-teal-600" : "text-white hover:text-teal-300"
                  }`}
                >
                  {group}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {dropdown === group && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl rounded-xl p-6 min-w-[240px]">
                    {items.map((it) => (
                      <Link
                        key={it.path}
                        to={it.path}
                        className="block px-4 py-3 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-teal-50 font-medium"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="outline"
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                solid
                  ? "border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                  : "border-2 border-white text-white hover:bg-white/10"
              }`}
              asChild
            >
              <Link to="/espace-client" className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Espace Client
              </Link>
            </Button>

            <Button
              className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              asChild
            >
              <Link to="/devis" className="flex items-center gap-2">
                Devis gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setOpen((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {open ? (
              <X className={`w-6 h-6 ${solid ? "text-slate-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${solid ? "text-slate-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-white shadow-xl border-none">
          <nav className="p-6 space-y-4">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {Object.entries(menu).map(([group, items]) => (
              <div key={group} className="pt-4">
                <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase mb-2">
                  {group}
                </h3>
                {items.map((it) => (
                  <Link
                    key={it.path}
                    to={it.path}
                    className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                    onClick={() => setOpen(false)}
                  >
                    {it.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="pt-4 space-y-3">
              <Button
                variant="outline"
                className="w-full border-2 border-teal-600 text-teal-600"
                asChild
              >
                <Link to="/espace-client">Espace Client</Link>
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
                asChild
              >
                <Link to="/devis">Devis gratuit</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}