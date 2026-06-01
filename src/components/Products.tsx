import { PRODUCTS } from "../data.ts";
import { Product, IMAGES } from "../types.ts";
import { Star, ShieldCheck, ShoppingCart, ArrowRight, AppWindow } from "lucide-react";

interface ProductsProps {
  lang: "EN" | "HI";
  onAddToCart: (prod: Product) => void;
  onInstantBuy: (prod: Product) => void;
}

export default function Products({ lang, onAddToCart, onInstantBuy }: ProductsProps) {
  // Simple helper to calculate discount percentage
  const getDiscount = (price: number, mrp: number) => {
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <section id="products" className="py-24 md:py-32 bg-[#0E0C08] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Title Group */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <span className="text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4 block">
              {lang === "EN" ? "OUR TRADITIONAL STALL" : "हमारा पारम्परिक स्टॉल"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {lang === "EN" ? (
                <>Preserved in Glass & Zip-Lock.<br /><span className="text-[#C9A84C]">Select Your Pure Weight.</span></>
              ) : (
                <>शीशे के जार और वायुरुद्ध पाउच।<br /><span className="text-[#C9A84C]">अपनी शुद्ध मात्रा का चयन करें।</span></>
              )}
            </h2>
          </div>
          <div className="flex gap-4">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A84C]" />
              {lang === "EN" ? "FSSAI Registered Batch #TG-2025" : "FSSAI स्वीकृत बैच #TG-2025"}
            </span>
          </div>
        </div>

        {/* Product Grid Stalls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-11 mb-24">
          {PRODUCTS.map((prod) => {
            const pct = getDiscount(prod.price, prod.mrp);

            return (
              <div
                key={prod.id}
                className="group bg-[#181410] border border-white/[0.03] hover:border-[#C9A84C]/30 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(201,168,76,0.12)] transform hover:-translate-y-1"
              >
                {/* Image showcase wrapper */}
                <div className="aspect-[4/5] bg-gradient-to-b from-[#221C14] to-[#181410] flex items-center justify-center p-6 relative overflow-hidden">
                  <img
                    src={prod.imageName}
                    alt={prod.name}
                    className="w-4/5 h-4/5 object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] group-hover:scale-105 group-hover:-translate-y-1.5 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle black mask gradient at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#181410] to-transparent pointer-events-none" />

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-[#C9A84C] text-black text-[9px] font-mono tracking-widest font-bold uppercase py-1.5 px-3 rounded-sm shadow-[0_5px_15px_rgba(0,0,0,0.4)]">
                    Save {pct}%
                  </div>

                  {/* Premium floating weight indicator */}
                  <div className="absolute top-4 left-4 bg-black/75 border border-[#C9A84C]/35 text-[#C9A84C] text-[10px] font-mono tracking-widest font-bold py-1.5 px-2.5 rounded-sm">
                    {prod.weightGrams >= 1000 ? "1 KG" : `${prod.weightGrams}G`}
                  </div>
                </div>

                {/* Info and Purchase blocks */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Star ratings details */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex text-[#C9A84C]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C9A84C]" />
                        ))}
                      </div>
                      <span className="font-mono text-[10px] text-gray-500">
                        {prod.rating} ({prod.ratingCount} reviews)
                      </span>
                    </div>

                    {/* Product name EN/HI */}
                    <h3 className="font-serif text-lg md:text-xl font-medium text-white mb-2 leading-tight group-hover:text-[#C9A84C] transition-colors duration-300">
                      {lang === "EN" ? prod.name : prod.hindiName}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                      {lang === "EN" ? prod.description : prod.hindiDescription}
                    </p>

                    {/* Highlighted core bullets */}
                    <ul className="mb-8 space-y-2.5">
                      {prod.benefits.slice(0, 3).map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[11px] text-gray-500 font-light">
                          <span className="text-[#C9A84C] mt-0.5">✦</span>
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and checkout trigger */}
                  <div>
                    {/* Divider line before checkout */}
                    <div className="h-[1px] bg-white/[0.04] mb-6" />

                    <div className="flex items-center justify-between gap-4">
                      {/* Price Column */}
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500 leading-none mb-1">
                          {lang === "EN" ? "SPECIAL PRICE" : "विशेष मूल्य"}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif font-semibold text-2xl text-[#C9A84C]">
                            ₹{prod.price}
                          </span>
                          <span className="font-sans line-through text-xs text-gray-600">
                            ₹{prod.mrp}
                          </span>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onAddToCart(prod)}
                          className="p-3 border border-gray-800 hover:border-[#C9A84C]/45 hover:bg-white/[0.02] text-gray-400 hover:text-[#C9A84C] rounded-sm transition-all duration-300 cursor-pointer"
                          title="Add to Shopping Cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onInstantBuy(prod)}
                          className="px-5 py-3 bg-[#C9A84C] hover:bg-[#FAF3E0] text-black font-mono font-bold text-[10px] tracking-[0.18em] uppercase rounded-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.25)] transition-all duration-300 cursor-pointer"
                        >
                          {lang === "EN" ? "BUY NOW" : "अभी खरीदें"}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Amazon, Flipkart style Listing Options */}
        <div id="purity" className="border border-white/[0.04] bg-[#181410] p-8 md:p-12 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">
              {lang === "EN" ? "Available on Premium Platforms" : "लोकप्रिय स्टोर पर उपलब्ध"}
            </h3>
            <p className="text-xs text-gray-500 font-light tracking-wide leading-relaxed">
              {lang === "EN" ? (
                "Enjoy guaranteed authenticity, prompt delivery, and direct customer care by selecting your preferred marketplace channel below."
              ) : (
                "पूर्ण प्रमाणिकता, त्वरित शिपिंग तथा सीधे कस्टमर केयर सहायता के लिए नीचे दिए गए लोकप्रिय स्टोर चैनलों को चुनें।"
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Amazon card */}
            <div className="bg-[#0E0C08] p-6 rounded-sm border border-white/[0.02] hover:border-[#C9A84C]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#C9A84C] uppercase block mb-1">
                  Amazon Prime
                </span>
                <h4 className="font-serif font-black text-white text-lg tracking-wider mb-2">
                  amazon<span className="text-[#C9A84C]">.in</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-6">
                  {lang === "EN" ? "Free delivery, COD options, and protected returns via Prime storefront." : "प्राइम डिलीवरी विकल्प, कैश ऑन डिलीवरी तथा सुरक्षित वापसी नीति।"}
                </p>
              </div>
              <a
                href="https://www.amazon.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 w-full text-center border border-gray-800 hover:border-orange-500 text-[10px] font-mono text-gray-400 hover:text-orange-400 tracking-wider uppercase rounded-sm transition-all duration-300"
              >
                <span>Buy On Amazon</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Flipkart card */}
            <div className="bg-[#0E0C08] p-6 rounded-sm border border-white/[0.02] hover:border-[#C9A84C]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#C9A84C] uppercase block mb-1">
                  Flipkart Assured
                </span>
                <h4 className="font-serif font-black text-blue-400 text-lg tracking-wider mb-2">
                  flip<span className="text-yellow-400">kart</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-6">
                  {lang === "EN" ? "Fast pan-India dispatch and assured safety packaging standards." : "न्यूनतम शिपिंग समय, सुरक्षित पैकेट सील और आसान ट्रैकिंग नीति।"}
                </p>
              </div>
              <a
                href="https://www.flipkart.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 w-full text-center border border-gray-800 hover:border-blue-500 text-[10px] font-mono text-gray-400 hover:text-blue-400 tracking-wider uppercase rounded-sm transition-all duration-300"
              >
                <span>Buy On Flipkart</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* WhatsApp Direct Order card */}
            <div className="bg-[#0E0C08] p-6 rounded-sm border border-white/[0.02] hover:border-[#C9A84C]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#C9A84C] uppercase block mb-1">
                  Direct Support
                </span>
                <h4 className="font-serif font-black text-green-500 text-lg tracking-wider mb-2">
                  whats<span className="text-white">app</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-6">
                  {lang === "EN" ? "DM to request customized bulk sizes or place quick local COD orders." : "कस्टमाइज्ड क्वांटिटी या भारी ऑर्डर हेतु सीधे चैट सहायता उपलब्ध।"}
                </p>
              </div>
              <a
                href="https://wa.me/918002824861?text=Hello%20Taad-Giri%2C%20I%20want%20to%20order%20premium%20Tal%20Mishri."
                target="_blank"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 w-full text-center border border-gray-800 hover:border-green-500 text-[10px] font-mono text-gray-400 hover:text-green-400 tracking-wider uppercase rounded-sm transition-all duration-300"
              >
                <span>Order On WhatsApp</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Instagram Support */}
            <div className="bg-[#0E0C08] p-6 rounded-sm border border-white/[0.02] hover:border-[#C9A84C]/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-[#C9A84C] uppercase block mb-1">
                  Social Channel
                </span>
                <h4 className="font-serif font-black text-pink-500 text-lg tracking-wider mb-2">
                  insta<span className="text-white">gram</span>
                </h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed mb-6">
                  {lang === "EN" ? "Join our growing organic community. Direct DM orders are open 24/7." : "हमारे जैविक उत्पाद परिवार का हिस्सा बनें। सीधे संवाद खुला है।"}
                </p>
              </div>
              <a
                href="https://www.instagram.com/ronak_bhagat_49?igsh=MWt5cXlyM2FlMjl1Yw=="
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 py-2 w-full text-center border border-gray-800 hover:border-pink-500 text-[10px] font-mono text-gray-400 hover:text-pink-400 tracking-wider uppercase rounded-sm transition-all duration-300"
              >
                <span>DM On Instagram</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
