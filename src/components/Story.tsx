import { Award, ShieldCheck, Heart, Leaf } from "lucide-react";
import { IMAGES } from "../types.ts";

interface StoryProps {
  lang: "EN" | "HI";
}

export default function Story({ lang }: StoryProps) {
  return (
    <section id="story" className="py-24 md:py-32 bg-[#0E0C08] text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] rounded-full border border-[#C9A84C]/5 pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] rounded-full border border-[#C9A84C]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Presentation Side (5 grid columns) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-4 border border-[#C9A84C]/15 rounded-sm z-0 transform group-hover:scale-[1.01] transition-transform duration-500" />
              
              {/* Primary High-res image: Pure palm forest and grove */}
              <div className="relative z-10 overflow-hidden rounded-sm bg-gray-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src={IMAGES.palmForest}
                  alt="Organic Palmyra Forest in Jharkhand"
                  className="w-full aspect-[3/4] object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              {/* Overlapping secondary image: The pure Mishri crystal stones */}
              <div className="absolute -bottom-10 -right-6 md:-right-10 w-2/3 aspect-[4/3] z-20 overflow-hidden rounded-sm border-4 border-[#0E0C08] shadow-[0_25px_50px_rgba(0,0,0,0.9)] bg-gray-900 group">
                <img
                  src={IMAGES.mishriInBowl}
                  alt="Pure Tal Mishri raw rocks"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Origin Floating Badge */}
              <div className="absolute -top-8 -left-6 bg-[#C9A84C] text-black p-4 z-20 flex flex-col items-center justify-center rounded-sm shadow-[0_15px_30px_rgba(201,168,76,0.3)]">
                <span className="font-serif font-black text-2xl leading-none">100%</span>
                <span className="text-[7px] font-mono tracking-[0.25em] -mt-0.5 text-center leading-3 uppercase font-bold">
                  {lang === "EN" ? "ORGANIC" : "जैविक"}
                </span>
                <span className="text-[6px] font-mono tracking-widest text-[#0E0C08] mt-1 text-center font-semibold">
                  JHARKHAND
                </span>
              </div>
            </div>
          </div>

          {/* Text Sourcing Side (7 grid columns) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Sec Eyebrow */}
            <span className="text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4 block">
              {lang === "EN" ? "THE ORIGIN & HERITAGE" : "उत्पत्ति एवं परंपरा"}
            </span>

            {/* Sec Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight mb-8">
              {lang === "EN" ? (
                <>
                  Born in Pristine Forests.<br />
                  <span className="text-[#C9A84C]">Sourced with Purity.</span>
                </>
              ) : (
                <>
                  झारखंड के वनों से उपजा,<br />
                  <span className="text-[#C9A84C]">अपरिसिद्धता की पराकाष्ठा।</span>
                </>
              )}
            </h2>

            {/* High-fidelity descriptive paragraphs */}
            <div className="space-y-6 text-[#D4C4A0] text-sm md:text-base leading-relaxed font-light">
              <p>
                {lang === "EN" ? (
                  "The majestic Palmyra palm trees (Taad) of Jharkhand thrive deep inside unpolluted tribal belts, growing organically on mineral-dense soil for over 25 years before yielding their first harvest. Unlike commercially cultured sugar alternatives, there are no fertilizers, no short-cuts, and absolutely no artificial scaling."
                ) : (
                  "झारखंड के आदिवासी वन्य क्षेत्रों में ताड़ के पेड़ प्राकृतिक रूप से उगते हैं। यह पेड़ भूमि से पोषक तत्व पाकर २५ वर्षों में परिपक्व होते हैं। वाणिज्यिक गन्ने के विपरीत, इनके विकास में जैविक खाद अथवा किसी रासायनिक उर्वरक का कदापि उपयोग नहीं होता।"
                )}
              </p>
              <p>
                {lang === "EN" ? (
                  "We named our venture Taad-Giri as a tribute to the legendary climbers who possess the ancient wisdom of extracting the pure sap. By purchasing Taad-Giri, you directly enable sustainable livelihoods for native tribal families, ensuring they receive double the fair-market premium."
                ) : (
                  "ताड़-गिरी उन परंपरागत आदिवासियों के प्रति हमारा सम्मान है जो पीढ़ियों से ताड़ रस निकालने की विद्या के संवाहक हैं। आपकी हर खरीद सीधे तौर पर इन परिवारों को वित्तीय संबल देती है तथा उन्हें सामान्य से दुगना लाभांश सुनिश्चित करती है।"
                )}
              </p>
            </div>

            {/* Structured Value Icons row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/[0.05]">
              <div className="flex flex-col gap-2">
                <Leaf className="w-5 h-5 text-[#C9A84C]" />
                <span className="font-serif font-bold text-xs text-white">
                  {lang === "EN" ? "Unrefined" : "अपरिष्कृत"}
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                  {lang === "EN" ? "No bleaching agent" : "बिना केमिकल ब्लीच"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
                <span className="font-serif font-bold text-xs text-white">
                  {lang === "EN" ? "Lab Validated" : "लैब प्रमाणित"}
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                  {lang === "EN" ? "Double tested batches" : "हर बैच की जांच"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Heart className="w-5 h-5 text-[#C9A846]" />
                <span className="font-serif font-bold text-xs text-white">
                  {lang === "EN" ? "Ayurvedic Cure" : "आयुर्वेदिक लाभ"}
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                  {lang === "EN" ? "Cold & cough relief" : "खांसी और सर्दी निवारक"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Award className="w-5 h-5 text-[#C9A84C]" />
                <span className="font-serif font-bold text-xs text-white">
                  {lang === "EN" ? "Traceable" : "क्यूआर अनुकूल"}
                </span>
                <span className="text-[10px] text-gray-500 font-mono tracking-wider">
                  {lang === "EN" ? "Scan to verify" : "पारदर्शिता अनिवार्य"}
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Botanical Portraits Showcase Gallery */}
        <div className="mt-28 pt-20 border-t border-white/[0.04]">
          <div className="text-center max-w-xl mx-auto mb-16 animate-fade-in-up">
            <span className="text-[#C9A84C] font-mono text-[9px] tracking-[0.4em] uppercase mb-4 block">
              {lang === "EN" ? "BOTANICAL PORTRAITS" : "ताड़ वानस्पतिक झलकियां"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
              {lang === "EN" ? "The Sacred Trees of Dumka" : "दुमका के प्राचीन कल्पवृक्ष"}
            </h3>
            <p className="text-xs text-gray-500 font-light mt-4 leading-relaxed max-w-md mx-auto">
              {lang === "EN" ? (
                "Explore the raw, wild majesty of Jharkhand's ancient Palmyra ecosystems where every drop of our medicinal Mishri takes birth."
              ) : (
                "झारखंड के प्राचीन ताड़ पारिस्थितिकी तंत्र की वास्तविक और अनछुई भव्यता देखें, जहां हमारी औषधीय मिश्री की एक-एक बूंद जन्म लेती है।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Grove */}
            <div className="group relative aspect-square rounded-sm overflow-hidden border border-white/[0.02] hover:border-[#C9A84C]/25 bg-black/40 transition-all duration-500 shadow-lg">
              <img
                src={IMAGES.palmGrove}
                alt="Palmyra palm grove in Jharkhand"
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase block mb-1">01 / Landscape</span>
                <h4 className="font-serif text-sm font-semibold text-white">
                  {lang === "EN" ? "The Sacred Grove" : "पवित्र ताड़ उपवन"}
                </h4>
                <p className="text-[10px] text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                  {lang === "EN" ? "Mineral-dense plains where Palmyra grows naturally." : "खनिज समृद्ध मैदान जहां ताड़ के पेड़ प्राकृतिक रूप से फलते-फूलते हैं।"}
                </p>
              </div>
            </div>

            {/* Card 2: Cluster */}
            <div className="group relative aspect-square rounded-sm overflow-hidden border border-white/[0.02] hover:border-[#C9A84C]/25 bg-black/40 transition-all duration-500 shadow-lg">
              <img
                src={IMAGES.palmFruitCluster}
                alt="Palmyra fruit cluster"
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase block mb-1">02 / Raw Inflorescence</span>
                <h4 className="font-serif text-sm font-semibold text-white">
                  {lang === "EN" ? "Fruit Infusion Clusters" : "ताड़ फल मंजरी"}
                </h4>
                <p className="text-[10px] text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                  {lang === "EN" ? "Golden nectar pockets rich in essential amino acids." : "आवश्यक अमीनो एसिड और विटामिन से भरपूर सुनहरी प्राकृतिक कलियां।"}
                </p>
              </div>
            </div>

            {/* Card 3: Forest Heights */}
            <div className="group relative aspect-square rounded-sm overflow-hidden border border-white/[0.02] hover:border-[#C9A84C]/25 bg-black/40 transition-all duration-500 shadow-lg">
              <img
                src={IMAGES.palmForest}
                alt="Ancient forest heights"
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase block mb-1">03 / Sourcing Canopy</span>
                <h4 className="font-serif text-sm font-semibold text-white">
                  {lang === "EN" ? "Ancient Forest Heights" : "सघन प्राचीन वन शिखर"}
                </h4>
                <p className="text-[10px] text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                  {lang === "EN" ? "Unhindered deep wilderness away from urban pollutants." : "शहरी प्रदूषकों से दूर प्रकृति की हरी-भरी तथा शुद्ध गोद।"}
                </p>
              </div>
            </div>

            {/* Card 4: Crystal close-up */}
            <div className="group relative aspect-square rounded-sm overflow-hidden border border-white/[0.02] hover:border-[#C9A84C]/25 bg-black/40 transition-all duration-500 shadow-lg">
              <img
                src={IMAGES.mishriCloseSpread}
                alt="Unbleached crystallized golden stones close-up"
                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                <span className="font-mono text-[8px] text-[#C9A84C] tracking-widest uppercase block mb-1">04 / Golden Crystallization</span>
                <h4 className="font-serif text-sm font-semibold text-white">
                  {lang === "EN" ? "Artisanal Diamond Crystals" : "शुद्ध स्वर्ण मिश्री खंड"}
                </h4>
                <p className="text-[10px] text-gray-500 font-light mt-1.5 leading-relaxed line-clamp-2">
                  {lang === "EN" ? "Irregular caramel stones packed with native minerals." : "खनिजों से सराबोर सोंधी सुगंध वाली सुनहरी मिश्री प्रस्तर।"}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
