import React from "react";
import { ArrowRight, Star, Shield, Award } from "lucide-react";
import { IMAGES } from "../types.ts";

interface HeroProps {
  lang: "EN" | "HI";
}

export default function Hero({ lang }: HeroProps) {
  const handleScrollToShop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector("#products");
    if (target) {
      const offset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-[#060503] overflow-hidden pt-20"
    >
      {/* Background Image with Ken Burns Zoom & Dusk Tint */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.palmDusk} // Backlit palms at dusk
          alt="Palmyra Majestic Palms"
          className="w-full h-full object-cover filter brightness-[0.25] saturate-[0.85] scale-105 animate-[zoom-slow_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric gradient masks resembling luxury cinema grids */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060503] via-[#060503]/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060503]/85 via-transparent to-[#060503]/85" />
      </div>

      {/* Hero Content Grid Card */}
      <div className="relative z-10 text-center max-w-5xl px-6 md:px-12 flex flex-col items-center">
        {/* Top Eyebrow Ring */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C9A84C]/35 mb-8 animate-[fade-in-up_1.2s_ease-out_both_100ms]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
          <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] text-[#FAF3E0]">
            {lang === "EN" ? "Pure · Traditional · Certified" : "शुद्ध · पारंपरिक · प्रमाणित"}
          </span>
        </div>

        {/* Brand Main Heading Display */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[110px] font-black text-white leading-none tracking-tight select-none mb-6 animate-[fade-in-up_1.2s_ease-out_both_300ms]">
          TAAD-<span className="text-[#C9A84C]">GIRI</span>
        </h1>

        {/* Beautiful Hindi call-out or tagline */}
        <p className="font-serif text-lg sm:text-2xl md:text-3xl italic text-[#FAF3E0]/90 tracking-wide max-w-2xl mb-8 leading-relaxed animate-[fade-in-up_1.2s_ease-out_both_500ms]">
          {lang === "EN" ? "Nature's Sweetest Medicine — Pure Tal Mishri" : "प्रकृति की शुद्धतम औषधि — असली ताल मिश्री"}
        </p>

        {/* Dynamic description tag */}
        <p className="text-xs sm:text-sm md:text-base font-sans text-gray-400 max-w-xl mx-auto mb-12 tracking-wide leading-relaxed font-light animate-[fade-in-up_1.2s_ease-out_both_700ms]">
          {lang === "EN"
            ? "Hand-tapped at dawn from the crown of native Palmyra palms in Jharkhand. Crystallised slowly, double laboratory certified, and sealed for transparent purity."
            : "झारखंड के वन्य क्षेत्रों से भोर की बेला में निकाला गया १००% शुद्ध ताड़ का रस। कोई मिलावट नहीं, कोई रासायनिक ब्लीच नहीं। पूर्णतया खनिज युक्त उत्पाद।"}
        </p>

        {/* Interactive Luxury buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md animate-[fade-in-up_1.2s_ease-out_both_900ms] mb-16">
          <a
            href="#products"
            onClick={handleScrollToShop}
            className="flex items-center justify-center gap-2 group px-8 py-4 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black font-mono font-bold text-xs tracking-[0.2em] uppercase rounded-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
          >
            {lang === "EN" ? "Collect Your Jar" : "अपना जार चुनें"}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#story")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex items-center justify-center py-4 px-8 border border-gray-800 hover:border-[#C9A84C]/50 text-gray-300 hover:text-[#C9A84C] text-xs font-mono font-semibold tracking-[0.2em] uppercase rounded-sm hover:bg-white/[0.02] hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
          >
            {lang === "EN" ? "Our Heritage" : "हमारी धरोहर"}
          </a>
        </div>
      </div>

      {/* Absolute Bottom floating stats bar with modular layout */}
      <div className="absolute bottom-0 left-0 w-full z-20 hidden md:block border-t border-white/[0.04] bg-[#060503]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-16 py-6 grid grid-cols-4 gap-8">
          <div className="flex flex-col border-l border-[#C9A84C]/35 pl-4">
            <span className="font-serif font-bold text-lg xl:text-xl text-white tracking-[0.05em]">100% PURE</span>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 mt-1">
              {lang === "EN" ? "PALMYRA SAP ORIGIN" : "शुद्ध ताड़ रस से निर्मित"}
            </span>
          </div>
          <div className="flex flex-col border-l border-[#C9A84C]/35 pl-4">
            <span className="font-serif font-bold text-lg xl:text-xl text-white tracking-[0.05em]">ZERO SULFUR</span>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 mt-1">
              {lang === "EN" ? "NO CHEMICAL BLEACHING" : "बिना केमिकल ब्लीचिंग"}
            </span>
          </div>
          <div className="flex flex-col border-l border-[#C9A84C]/35 pl-4">
            <span className="font-serif font-bold text-lg xl:text-xl text-white tracking-[0.05em]">FSSAI CERTIFIED</span>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 mt-1">
              {lang === "EN" ? "GOVT APPROVED PURITY" : "भारत सरकार द्वारा स्वीकृत"}
            </span>
          </div>
          <div className="flex flex-col border-l border-[#C9A84C]/35 pl-4">
            <span className="font-serif font-bold text-lg xl:text-xl text-white tracking-[0.05em]">MINERAL RICH</span>
            <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-gray-400 mt-1">
              {lang === "EN" ? "VITAMINS & IRON" : "आयरन और बी१२ युक्त"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
