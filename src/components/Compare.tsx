import { COMPARISONS } from "../data.ts";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

interface CompareProps {
  lang: "EN" | "HI";
}

export default function Compare({ lang }: CompareProps) {
  return (
    <section className="py-24 md:py-32 bg-[#060503] text-white overflow-hidden relative">
      {/* Decorative Blur Ambient Layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[40%] w-96 h-96 bg-[#C9A84C]/5 filter blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{lang === "EN" ? "KNOW THE COLD FACTS" : "कड़वा सच जानें"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {lang === "EN" ? (
              <>Taad-Giri vs <span className="text-[#C9A84C]">Chemical Brands</span></>
            ) : (
              <>ताड़-गिरी बनाम <span className="text-[#C9A84C]">केमिकल मिश्रित ब्रांड</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {lang === "EN" ? (
              "Cheap market brands sell sulfur-bleached sugar sugarcraft claiming it as pure Tal Mishri. Pay for health, not for disguised toxins."
            ) : (
              "बाजार में कम कीमत वाले ब्रांड अक्सर सफेद रसायनों से परिष्कृत चीनी को ताल मिश्री कहकर बेचते हैं। स्वास्थ्य चुनें, जहर नहीं।"
            )}
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="overflow-x-auto rounded-sm border border-white/[0.04] bg-[#0E0C08] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.05] bg-black/40">
                <th className="py-6 px-8 text-gray-400 font-serif text-[11px] md:text-xs font-semibold uppercase tracking-widest">
                  {lang === "EN" ? "CORE METRIC" : "प्रमुख मानक"}
                </th>
                <th className="py-6 px-8 text-[#C9A84C] font-serif text-[12px] md:text-sm font-black uppercase tracking-widest bg-[#C9A84C]/5 border-x border-[#C9A84C]/10">
                  <span className="flex items-center gap-1.5 justify-center">
                    <Sparkles className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                    <span>✦ TAAD-GIRI</span>
                  </span>
                </th>
                <th className="py-6 px-8 text-gray-500 font-serif text-[11px] md:text-xs font-semibold uppercase tracking-widest">
                  {lang === "EN" ? "CHEAP BRANDS (₹100/kg)" : "सस्ते ब्रांड (₹100/किलो)"}
                </th>
                <th className="py-6 px-8 text-gray-500 font-serif text-[11px] md:text-xs font-semibold uppercase tracking-widest">
                  {lang === "EN" ? "REGULAR CANE SUGAR" : "साधारण गन्ने वाली चीनी"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {COMPARISONS.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-white/[0.01] transition-colors duration-200"
                >
                  {/* Metric column */}
                  <td className="py-5 px-8 text-xs md:text-sm font-semibold tracking-wide text-gray-400 font-serif">
                    {row.feature}
                  </td>

                  {/* TaadGiri winner column */}
                  <td className="py-5 px-8 text-xs md:text-sm text-[#FAF3E0] font-light bg-[#C9A84C]/[0.02] border-x border-[#C9A84C]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-sans font-medium text-gray-200">{row.taadgiri}</span>
                    </div>
                  </td>

                  {/* Cheap Brands column */}
                  <td className="py-5 px-8 text-xs md:text-sm text-gray-600 font-light">
                    <div className="flex items-center gap-3 font-sans">
                      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                        <X className="w-3 h-3" />
                      </div>
                      <span>{row.cheapBrands}</span>
                    </div>
                  </td>

                  {/* Cane sugar column */}
                  <td className="py-5 px-8 text-xs md:text-sm text-gray-600 font-light font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                        <X className="w-3 h-3" />
                      </div>
                      <span>{row.regularSugar}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Truth call out banner */}
        <div className="mt-12 text-center">
          <p className="text-[12px] md:text-sm text-gray-500 italic block font-serif">
            {lang === "EN" ? (
              '"जो सस्ता है वो असली नहीं, जो असली है वो सस्ता नहीं।" — Sourced with care in Jharkhand, India.'
            ) : (
              '"जो सस्ता है वो असली नहीं, जो असली है वो सस्ता नहीं।" — पूर्ण ताड़ शुद्धता, झारखंड।'
            )}
          </p>
        </div>

      </div>
    </section>
  );
}
