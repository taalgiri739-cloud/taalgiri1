import { PROCESS_STEPS } from "../data.ts";
import { Sparkles, ArrowDown } from "lucide-react";
import { IMAGES } from "../types.ts";

interface ProcessProps {
  lang: "EN" | "HI";
}

export default function Process({ lang }: ProcessProps) {
  return (
    <section id="process" className="py-24 md:py-32 bg-[#060503] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-[#C9A84C]" />
            <span>{lang === "EN" ? "JOURNEY OF CRAFTSMANSHIP" : "निर्माण की दिव्य यात्रा"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            {lang === "EN" ? (
              <>From Sky-High Palm Canopy<br />to <span className="text-[#C9A84C]">Golden Crystals</span></>
            ) : (
              <>गगनचुंबी ताड़ शिखर से<br /><span className="text-[#C9A84C]">सुनहरे क्रिस्टल रूप तक</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-light max-w-xl mx-auto mt-6 leading-relaxed">
            {lang === "EN" ? (
              "Every single stone of Taad-Giri Tal Mishri takes 21 days of patient crystallization, harvested by skilled hands and heated with sustainable firewood."
            ) : (
              "ताड़-गिरी मिश्री के प्रत्येक सुनहरे क्रिस्टल के बनने में २१ दिनों की एकाग्र प्रतीक्षा समाहित है, जिसे कुशल पर्वतारोहियों द्वारा संचित किया जाता है।"
            )}
          </p>
        </div>

        {/* Bento Grid layout for steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting line running through stepping indices */}
          <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-[1px] bg-[#C9A84C]/15 z-0 pointer-events-none" />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="group flex flex-col items-center text-center relative z-10 transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* Stepping Indicator Bubble */}
              <div className="w-14 h-14 rounded-full border border-[#C9A84C]/30 bg-[#060503] flex items-center justify-center font-mono font-bold text-xs tracking-wider text-[#C9A84C] mb-8 shadow-[0_5px_15px_rgba(0,0,0,0.8)] outline-8 outline-[#060503] group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10 group-hover:shadow-[0_0_25px_rgba(201,168,76,0.25)] transition-all duration-500">
                {step.step}
              </div>

              {/* Step Title */}
              <h3 className="font-serif font-semibold text-lg text-white mb-2 group-hover:text-[#C9A84C] transition-colors duration-300">
                {lang === "EN" ? step.title : step.hindiTitle}
              </h3>
              <p className="text-[10px] tracking-[0.15em] font-mono uppercase text-gray-500 mb-4 font-medium">
                {step.subtitle}
              </p>

              {/* Step Description */}
              <p className="text-xs text-gray-400 font-light leading-relaxed max-w-[250px] mb-8">
                {lang === "EN" ? step.description : step.hindiDescription}
              </p>

              {/* Photo Attachment inside Card with custom overlays resembling high-fashion catalog portals */}
              <div className="w-full aspect-square rounded-sm overflow-hidden border border-gray-950 shadow-[0_15px_30px_rgba(0,0,0,0.85)] relative group-hover:border-[#C9A84C]/35 transition-all duration-500">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.95] group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Floating caption pill */}
                <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md border border-white/[0.05] text-[7.5px] font-mono tracking-widest text-[#FAF3E0] font-semibold uppercase px-2 py-1 rounded-sm">
                  {lang === "EN" ? "STEP" : "चरण"} 0{idx + 1} Sourcing
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Process Detail: Giant wood fire boiler and sap boiling visual detail */}
        <div className="mt-28 p-8 md:p-14 rounded-sm border border-white/[0.04] bg-[#0E0C08] grid grid-cols-1 lg:grid-cols-12 gap-11 items-center shadow-[0_15px_40px_rgba(0,0,0,0.7)] relative overflow-hidden group">
          {/* Ambient red flame glow bottom-left inside boiler details */}
          <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-orange-600/5 filter blur-3xl pointer-events-none group-hover:bg-orange-600/10 transition-all duration-1000" />
          
          <div className="lg:col-span-4 relative z-10">
            <span className="text-orange-500 tracking-[0.25em] font-mono text-[9px] font-bold uppercase mb-4 block">
              {lang === "EN" ? "✦ BEYOND THE HARVEST" : "✦ खदबदाता रस"}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold leading-tight mb-6">
              {lang === "EN" ? "Heated Over 48-Hour Firewood Boilers" : "कौड़ियों जैसी आंच पर रसाकर्षण"}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
              {lang === "EN" ? (
                "After filtering, the sweet Palmyra nectar is poured into massive iron pots. We cook the sap for over 48 hours. Only a veteran master boiler knows the exact second the Neera hits the optimum density for perfect crystal strings."
              ) : (
                "ताड़ के मीठे रस को छानने के पश्चात विशाल लौह कड़ाहों में डाला जाता है। इसे निरंतर ४८ घंटों तक मंद आंच पर उबाला जाता है। इसकी सघनता का आकलन केवल हमारे अनुभवी सुपुत्र ही कर सकते हैं।"
              )}
            </p>
            <div className="flex items-center gap-3 text-[#C9A84C] font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animation-pulse" />
              <span>{lang === "EN" ? "Pure Jaggery Wood-Fire Cooking" : "देसी लकड़ी की जैविक भट्टी"}</span>
            </div>
          </div>

          {/* Majestic landscape boiler frame */}
          <div className="lg:col-span-8 rounded-sm overflow-hidden aspect-[16/9] relative shadow-[0_10px_30px_rgba(0,0,0,0.85)] border border-gray-950 z-10 pointer-events-auto">
            <img
              src={IMAGES.boilingSapCauldron}
              alt="Huge wood fire cauldron boiling Neera"
              className="w-full h-full object-cover filter brightness-90 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
            <div className="absolute bottom-4 right-4 bg-[#C9A84C]/95 text-black px-3.5 py-1.5 text-[8px] font-mono tracking-widest font-bold uppercase rounded-sm flex items-center gap-1.5">
              <span>{lang === "EN" ? "WOOD-FIRE CAULDRON" : "पारंपरिक कड़ाहा"}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
