import { REVIEWS } from "../data.ts";
import { Star, CheckCircle, Quote, MessageSquareQuote } from "lucide-react";
import { IMAGES } from "../types.ts";

interface ReviewsProps {
  lang: "EN" | "HI";
}

export default function Reviews({ lang }: ReviewsProps) {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#0E0C08] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{lang === "EN" ? "VERIFIED REVIEWS" : "सच्ची ग्राहक समीक्षाएं"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {lang === "EN" ? (
              <>Words from the <span className="text-[#C9A84C]">Vedic Community</span></>
            ) : (
              <>विवेकशील स्वास्थ्य प्रेमियों के <span className="text-[#C9A84C]">सच्चे अनुभव</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {lang === "EN" ? (
              "From Ayurvedic doctors to conscious parents, discover why health-aware consumers exclusively buy Taad-Giri."
            ) : (
              "आयुर्वेदिक चिकित्सकों से लेकर बच्चों के माता-पिता तक, जानें क्यों स्वास्थ्य के प्रति जागरूक उपभोक्ता केवल ताड़-गिरी चुनते हैं।"
            )}
          </p>
        </div>

        {/* Testimonials Grid (2 columns on medium, 4 on extra-wide or standard 2-3 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#181410] border border-white/[0.02] hover:border-[#C9A84C]/25 rounded-sm p-8 md:p-10 relative flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(201,168,76,0.08)] transform hover:-translate-y-1 transition-all duration-500Group"
            >
              {/* Giant quote mark decoration */}
              <div className="absolute top-6 right-6 text-[#C9A84C]/5 group-hover:text-[#C9A84C]/10 transition-colors duration-500 leading-none select-none">
                <Quote className="w-14 h-14" />
              </div>

              <div>
                {/* Score panel */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-[#C9A84C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">5.0 / 5.0</span>
                </div>

                {/* Review actual Text comment */}
                <p className="text-[#D4C4A0] text-sm md:text-base font-light font-serif leading-relaxed mb-8 italic">
                  &quot;{lang === "EN" ? rev.comment : rev.hindiComment}&quot;
                </p>
              </div>

              {/* Author footer specifications */}
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-6 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  {/* Circle custom initial avatar */}
                  <div className="w-11 h-11 rounded-full bg-[#C9A84C] text-black font-serif font-black flex items-center justify-center text-sm shadow-[0_4px_10px_rgba(201,168,76,0.3)]">
                    {rev.avatarText}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif font-bold text-sm text-white">{rev.author}</span>
                    <span className="text-[10px] text-gray-500 tracking-wider font-mono uppercase">
                      {rev.location}
                    </span>
                  </div>
                </div>

                {/* Purchase verification label row */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-green-400 font-mono text-[9px] uppercase tracking-widest font-semibold leading-none mb-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>{lang === "EN" ? "Verified" : "प्रमाणित"}</span>
                  </div>
                  <span className="text-[10px] text-[#C9A84C] font-mono font-medium tracking-wider">
                    {rev.source} Store
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic trust block with unbleached organic crystal close-up images */}
        <div className="mt-20 p-8 md:p-12 border border-white/[0.04] rounded-sm bg-[#060503] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-[0_15px_35px_rgba(0,0,0,0.5)]">
          <div className="md:col-span-8">
            <h4 className="font-serif text-lg md:text-xl font-medium text-white mb-2">
              {lang === "EN" ? "Tested for Purity? Scan any pack!" : "शुद्धता की असली गारंटी? क्यूआर कोड जांचें!"}
            </h4>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-2xl">
              {lang === "EN" ? (
                "Each Taad-Giri shipment includes an active batch lab certificate. Simply scan the QR code printed on the container to read independent laboratory chromatography analysis confirming 0% heavy metals, 0% added sugars, and 100% Palmyra content."
              ) : (
                "प्रत्येक ताड़-गिरी खेप के साथ एक लैब टेस्ट रिपोर्ट संलग्न की जाती है। जार के ढक्कन पर दिए गए क्यूआर कोड को स्कैन करके स्वतंत्र प्रयोगशाला द्वारा किए गए जांच विश्लेषण को जांचें।"
              )}
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="relative group overflow-hidden rounded-sm aspect-video w-full max-w-[280px] border border-gray-950 shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
              <img
                src={IMAGES.mishriCloseSpread}
                alt="Unbleached golden mishri stones close up"
                className="w-full h-full object-cover filter brightness-[0.75]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 bg-[#C9A84C] text-black px-2 py-1 text-[8px] font-mono tracking-widest font-black uppercase rounded-sm">
                {lang === "EN" ? "BATCH REPORT" : "बैच रिपोर्ट"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
