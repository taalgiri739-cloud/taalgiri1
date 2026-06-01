import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, Languages } from "lucide-react";
import { IMAGES } from "../types.ts";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  lang: "EN" | "HI";
  onToggleLang: () => void;
}

export default function Navbar({ cartCount, onOpenCart, lang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Our Story", hindi: "हमारी कहानी", href: "#story" },
    { label: "Tradition & Process", hindi: "निर्माण विधि", href: "#process" },
    { label: "Pure Collection", hindi: "शुद्ध संग्रह", href: "#products" },
    { label: "Purity Check", hindi: "शुद्धता की परख", href: "#purity" },
    { label: "Reviews", hindi: "सच्चे अनुभव", href: "#reviews" },
    { label: "Care & Help", hindi: "ग्राहक सेवा", href: "#care" },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // height of floating navbar
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-16 py-4 mr-0 ${
        scrolled
          ? "bg-[#060503]/95 backdrop-blur-xl border-b border-[#C9A84C]/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo with beautiful crest */}
        <a
          href="#hero"
          onClick={(e) => handleScrollToSection(e, "#hero")}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src={IMAGES.brandLogo}
            alt="Taad-Giri Crest Logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-[#C9A84C]/30 object-cover p-0.5 shadow-[0_0_15px_rgba(201,168,76,0.2)] group-hover:border-[#C9A84C] group-hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif font-semibold tracking-[0.25em] text-white text-[11px] md:text-sm group-hover:text-[#C9A84C] transition-colors duration-300">
              TAAD-GIRI
            </span>
            <span className="text-[7px] md:text-[8px] tracking-[0.4em] uppercase text-[#C9A84C]/80 font-mono">
              JHARKHAND PURE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Link System */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-11">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleScrollToSection(e, item.href)}
              className="relative text-[10px] xl:text-[11px] font-mono tracking-[0.2em] uppercase text-gray-300 hover:text-[#C9A84C] transition-colors duration-300 py-2 group"
            >
              {lang === "EN" ? item.label : item.hindi}
              {/* Apple-style thin underline animation */}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A84C] group-hover:w-full transition-all duration-300 ease-out" />
            </a>
          ))}
        </nav>

        {/* Action Controls Column */}
        <div className="flex items-center gap-2 md:gap-5">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-gray-800 hover:border-[#C9A84C]/40 text-xs font-mono text-gray-400 hover:text-[#C9A84C] transition-all duration-300 cursor-pointer"
            title="Switch Language"
          >
            <Languages className="w-3.5 h-3.5 text-[#C9A84C]" />
            <span className="text-[10px] tracking-widest">{lang}</span>
          </button>

          {/* Luxury Cart Drawer Trigger with motion indicator */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-gray-900 border border-transparent hover:border-[#C9A84C]/10 text-white hover:text-[#C9A84C] transition-all duration-300 cursor-pointer group"
          >
            <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] text-[#060503] font-mono font-bold text-[9px] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(201,168,76,0.6)] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburguer Panel Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#C9A84C] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel Layer with beautiful glass backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] left-0 w-full h-[calc(100vh-72px)] bg-[#060503]/98 backdrop-blur-2xl z-40 flex flex-col justify-between py-12 px-8 border-t border-gray-950 animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="text-[9px] tracking-[0.4em] text-[#C9A84C] font-mono mb-4 uppercase">
              {lang === "EN" ? "Explore Purity" : "शुद्धता का अन्वेषण करें"}
            </div>
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-2xl font-serif text-gray-200 hover:text-[#C9A84C] transition-colors duration-300 flex items-center gap-4 py-2 border-b border-gray-950"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-xs font-mono text-[#C9A84C]/50">0{index + 1}</span>
                {lang === "EN" ? item.label : item.hindi}
              </a>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className="flex flex-col gap-4 border-t border-gray-900 pt-8">
            <p className="text-[10px] text-gray-500 font-mono tracking-widest text-center">
              TAAD-GIRI PREMIUM TAL MISHRI
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full bg-[#C9A84C] text-[#060503] uppercase font-mono tracking-widest text-[11px] font-bold py-4 text-center rounded-sm hover:bg-[#FAF3E0] transition-colors duration-300"
            >
              {lang === "EN" ? "Open Cart" : "थैला खोलें"} ({cartCount})
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
