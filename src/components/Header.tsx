import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, UserCircle, ArrowRight } from "lucide-react";

const TOP_THRESHOLD = 120;

type GroupKey = "Particuliers" | "Pro";

export default function Header() {
  const [openMobile, setOpenMobile] = useState(false);
  const [openGroup, setOpenGroup] = useState<GroupKey | null>(null);
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(true);
  const solid = !atTop;

  const lastY = useRef(0);
  const raf = useRef<number>();
  const hoverTimer = useRef<number | null>(null);
  const btnRefs = useRef<Record<GroupKey, HTMLButtonElement | null>>({
    Particuliers: null,
    Pro: null,
  });

  const location = useLocation();

  const menu: Record<GroupKey, { label: string; path: string }[]> = {
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

  /* Reset on route change */
  useEffect(() => {
    setOpenMobile(false);
    setOpenGroup(null);
    lastY.current = window.scrollY;
    setAtTop(window.scrollY < TOP_THRESHOLD);
    setVisible(true);
  }, [location.pathname]);

  /* Header hide/show on scroll (style twitter) */
  useEffect(() => {
    const onScroll = () => {
      const curr = window.scrollY;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const goingUp = curr < lastY.current - 2;
        const goingDown = curr > lastY.current + 2;

        setAtTop(curr < TOP_THRESHOLD);
        setVisible(goingUp || curr < 8);

        lastY.current = curr;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    if (!openMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openMobile]);

  /* Hover intent helpers for desktop */
  const openWithDelay = (key: GroupKey) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenGroup(key), 80);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpenGroup(null), 120);
  };

  /* ESC to close */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setOpenMobile(false);
        if (openGroup && btnRefs.current[openGroup]) {
          btnRefs.current[openGroup]?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGroup]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-300 will-change-transform",
        visible ? "translate-y-0" : "-translate-y-full",
        solid
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.08)]"
          : "bg-transparent",
      ].join(" ")}
      style={{ transform: "translateZ(0)" }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/image.png"
              alt="Prévoyance Services"
              className={`h-[90px] md:h-[110px] w-auto object-contain transition-all ${
                solid ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
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

            {(Object.keys(menu) as GroupKey[]).map((group) => (
              <div
                key={group}
                className="relative"
                onMouseEnter={() => openWithDelay(group)}
                onMouseLeave={closeWithDelay}
              >
                <button
                  ref={(el) => (btnRefs.current[group] = el)}
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={openGroup === group}
                  onClick={() => setOpenGroup(openGroup === group ? null : group)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenGroup(openGroup === group ? null : group);
                    }
                  }}
                  className={`flex items-center gap-1 px-4 py-2 text-lg font-semibold transition-colors ${
                    solid ? "text-slate-900 hover:text-teal-600" : "text-white hover:text-teal-300"
                  }`}
                >
                  {group}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openGroup === group ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown (anti-trou + hover intent) */}
                {openGroup === group && (
                  <div
                    role="menu"
                    className="absolute top-full left-0 mt-2 w-[260px] rounded-xl border border-slate-200 bg-white p-2 shadow-2xl z-[70]"
                    onMouseEnter={() => openWithDelay(group)}
                    onMouseLeave={closeWithDelay}
                  >
                    {/* zone tampon anti-trou */}
                    <div className="absolute -top-2 left-0 right-0 h-2" />
                    {menu[group].map((it) => (
                      <Link
                        key={it.path}
                        to={it.path}
                        role="menuitem"
                        className="block px-4 py-3 rounded-lg text-slate-700 hover:bg-teal-50 hover:text-teal-700 font-medium"
                        onClick={() => setOpenGroup(null)}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop actions */}
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

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setOpenMobile((v) => !v)}
            aria-label="Ouvrir le menu"
          >
            {openMobile ? (
              <X className={`w-6 h-6 ${solid ? "text-slate-900" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${solid ? "text-slate-900" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {openMobile && (
        <div className="lg:hidden bg-white shadow-xl border-none z-[65]">
          <nav className="p-6 space-y-4">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                onClick={() => setOpenMobile(false)}
              >
                {l.label}
              </Link>
            ))}

            {(Object.keys(menu) as GroupKey[]).map((group) => (
              <div key={group} className="pt-4">
                <h3 className="px-4 text-sm font-semibold text-slate-500 uppercase mb-2">
                  {group}
                </h3>
                {menu[group].map((it) => (
                  <Link
                    key={it.path}
                    to={it.path}
                    className="block px-4 py-3 text-slate-700 hover:text-teal-600 hover:bg-slate-50 rounded-lg"
                    onClick={() => setOpenMobile(false)}
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
              <Button className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 text-white" asChild>
                <Link to="/devis">Devis gratuit</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}