import React, { useState, useEffect, useRef } from "react";
import { 
  ShieldCheck, 
  MessageSquare, 
  Search, 
  Sparkles, 
  Clock, 
  Truck, 
  Inbox, 
  ArrowRight, 
  Send, 
  User, 
  CornerDownRight, 
  CheckCircle, 
  BookOpen, 
  PhoneCall,
  HelpCircle,
  HelpCircle as SupportIcon
} from "lucide-react";

interface CustomerCareProps {
  lang: "EN" | "HI";
}

export default function CustomerCare({ lang }: CustomerCareProps) {
  // Navigation tabs: "AI-Help", "Track-Order", "Batch-Report", "Helpdesk"
  const [activeTab, setActiveTab] = useState<"ai-chat" | "track" | "batch" | "faqs">("ai-chat");

  // Chat States
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: lang === "EN" 
        ? "Pranam! I am Sukhdev, your traditional care guide. How can I assist you with authentic Tal Mishri remedies, purity analysis, or shipping status?"
        : "प्रणाम! मैं सुखदेव हूँ, आपका पारंपरिक स्वास्थ्य सहायक। मैं ताड़ मिश्री के औषधीय गुणों, शुद्धता प्रमाणपत्र, या शिपिंग के विषय में आपकी क्या सहायता कर सकता हूँ?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Order Tracking States
  const [trackingId, setTrackingId] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState("");
  const [isSearchingTrack, setIsSearchingTrack] = useState(false);

  // Batch analysis lookup states
  const [selectedBatch, setSelectedBatch] = useState("TG-B26");
  const [batchReport, setBatchReport] = useState<any>(null);
  const [isLoadingBatch, setIsLoadingBatch] = useState(false);

  // FAQ Expanded Panel states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Feedback form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", query: "" });
  const [isSubmitContact, setIsSubmitContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Scroll to bottom of chat logs
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Load batch report initially or on select change
  useEffect(() => {
    const fetchBatch = async () => {
      setIsLoadingBatch(true);
      try {
        const response = await fetch(`/api/batch-report/${selectedBatch}`);
        const data = await response.json();
        if (data.success) {
          setBatchReport(data.report);
        }
      } catch (err) {
        console.error("Error loading batch chromatography:", err);
      } finally {
        setIsLoadingBatch(false);
      }
    };
    fetchBatch();
  }, [selectedBatch]);

  // Trigger Gemini/Local Chatbot message exchange
  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || userInput;
    if (!textToSend.trim()) return;

    setUserInput("");
    const newMessages = [...messages, { role: "user" as const, content: textToSend }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await response.json();
      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant" as const, content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant" as const, content: "My apologies, I am adjusting the hearth. Please repeat your query." }]);
      }
    } catch (err) {
      console.error("Chat failure:", err);
      setMessages(prev => [...prev, { role: "assistant" as const, content: "Connecting forest line... Please try again shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Submit Order tracking search
  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setIsSearchingTrack(true);
    setTrackingError("");
    setTrackingResult(null);

    try {
      const response = await fetch(`/api/order-status/${trackingId.toUpperCase()}`);
      const data = await response.json();
      if (data.found) {
        setTrackingResult(data.order);
      } else {
        setTrackingError(data.message || "Order code not identified.");
      }
    } catch (err) {
      setTrackingError("Could not connect to tracking database.");
    } finally {
      setIsSearchingTrack(false);
    }
  };

  // Pre-seed tracking ID helper
  const handleQuickTrack = (id: string) => {
    setTrackingId(id);
    // Auto-fire track
    setTimeout(() => {
      const form = document.getElementById("track-form") as HTMLFormElement;
      form?.requestSubmit();
    }, 100);
  };

  // Handle support ticket submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitContact(true);

    const formattedTicket = `*NEW TAAD-GIRI SUPPORT TICKET* %0A%0A` +
      `*Guest Name:* ${contactForm.name}%0A` +
      `*Email Address:* ${contactForm.email}%0A` +
      `*Query / Consultancy Request:* %0A${contactForm.query}%0A%0A` +
      `Please assist with Ayurvedic remedy or bulk purchase.`;

    setTimeout(() => {
      setIsSubmitContact(false);
      setContactSuccess(true);
      
      // Open WhatsApp web pre-filled direct redirect
      window.open(`https://wa.me/918002824861?text=${formattedTicket}`, "_blank", "referrerPolicy=no-referrer");
      
      setContactForm({ name: "", email: "", query: "" });
    }, 1000);
  };

  // Ayurvedic Wisdom FAQs List
  const faqs = [
    {
      q: lang === "EN" ? "What is the key difference between Palm Candy (Tal Mishri) and Refined Sugar?" : "ताड़ मिश्री और साधारण चीनी में क्या मुख्य अंतर है?",
      a: lang === "EN" 
        ? "Refined sugar is treated with toxic sulfur-dioxide bleach and contains empty sucrose calories, causing rapid blood glucose spikes. Taad-Giri Palm Candy is naturally low-glycemic (GI value 35), fully unbleached, and packed with 24 natural minerals like potassium, zinc, and iron that support lung function and soothe digestion."
        : "साधारण चीनी परिष्कृत करने के लिए सल्फर-डाइऑक्साइड केमिकल का प्रयोग होता है जो हमारे शरीर को नुकसान पहुंचता है। ताड़-गिरी मिश्री बिना किसी केमिकल रिफाइनिंग के, ताड़ रस को मंद आंच पर पकाकर बनाई जाती है। इसका ग्लाइसेमिक इंडेक्स मात्र 35 है, जो ब्लड शुगर को तेजी से नहीं बढ़ाता और इसमें प्रचुर पोटैशियम, जिंक और आयरन होता है।"
    },
    {
      q: lang === "EN" ? "How should Tal Mishri be consumed for persistent cough and sore throat?" : "गले की खराश और खांसी के लिए मिश्री का सेवन कैसे करें?",
      a: lang === "EN"
        ? "For dry cough and hoarse voice, Ayurveda recommends taking 1/2 teaspoon of powder Taad-Giri Mishri with 1/4 teaspoon dry ginger (Saunth) and green cardamom. Dissolve slowly on the tongue or mix into warm organic milk. This lubricates the mucosal tract (Kanthya property) and placifies acute Vata-Kapha dosha."
        : "सूखी खांसी और गले की तकलीफ के लिए आधे चम्मच ताड़-गिरी चूर्ण में चुटकी भर सोंठ और हरी इलायची मिलाएं। इसे गुनगुने दूध में मिलाकर पिएं अथवा मुंह में रखकर धीरे-धीरे चूसें। यह बलगम संचय को ढीला करता है और वात-कफ दोष को शांत करता है।"
    },
    {
      q: lang === "EN" ? "What does 'Unbleached Batch Chromatography' mean?" : "'अनब्लीचड बैच क्रोमैटोग्राफी' का क्या अर्थ है?",
      a: lang === "EN"
        ? "Most market competitors sell bleached candy to make it white. Real palm sap reduces to a naturally golden-amber hue. We independent-test every single forest container of Taad-Giri via chemical chromatography. We print the batch code on each box, verifying 0.00% lead, pesticide-free, and full trace nutrient concentrations directly in the lab."
        : "बाजार में मिलने वाली सफेद मिश्री को रसायनों से ब्लीच किया जाता है। असली ताड़ मिश्री का रंग हमेशा हल्का सुनहरा या भूरा-केरामल होता है। हम हर बेच का प्रयोगशाला परीक्षण कराते हैं, ताकि रसायनों, कीटनाशकों और सीसे जैसी भारी धातुओं की उपस्थिति 0.00% सुनिश्चित की जा सके।"
    },
    {
      q: lang === "EN" ? "What is your refund / replacement policy if I receive broken glass jar?" : "यदि जार टूट जाता है, तो रिफंड या रिप्लेसमेंट की क्या नीति है?",
      a: lang === "EN"
        ? "We provide an Absolute Purity & Sourcing Guarantee. If your premium container arrives damaged on transit, simply click our WhatsApp Chat on screen with a photo. We will immediately ship an express replacement 100% free of charge. Your trust is our sacred pride."
        : "हमारी पवित्र सेवा नीति है। यदि ट्रांजिट में जार टूट जाता है, तो बस व्हाट्सएप पर तस्वीर साझा करें। हम बिना किसी अतिरिक्त शुल्क के तुरंत आपके घर नया जार पहुंचाएंगे। आपका विश्वास हमारी धरोहर है।"
    }
  ];

  return (
    <section id="care" className="py-24 md:py-32 bg-[#060503] border-t border-white/[0.02] text-white relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#C9A84C]/5 filter blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === "EN" ? "GOURMET TRUST & SUPPORT" : "कंज्यूमर वेलनेस एवं केयर पोर्टल"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {lang === "EN" ? (
              <>Taad-Giri <span className="text-[#C9A84C]">Care & Authenticity</span> Hub</>
            ) : (
              <>सच्चा स्वास्थ्य: <span className="text-[#C9A84C]">ग्राहक सेवा और शुद्धता केंद्र</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-light mt-6 max-w-lg mx-auto leading-relaxed">
            {lang === "EN" ? (
              "Amazon-level service with Ayurvedic legacy. Track order shipment directly, verify forest batch laboratory reports, and resolve remedies with our AI Specialist."
            ) : (
              "अमेज़न और शॉपिफाई स्तर की पारदर्शी सुविधाएं। अपने ऑर्डर को ट्रैक करें, फॉरेस्ट बैच लैब रिपोर्ट देखें और हमारे स्वास्थ्य विशेषज्ञ से सीधा संवाद करें।"
            )}
          </p>
        </div>

        {/* Outer Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Sub Navigation side panel (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col justify-start space-y-2">
            <button
              onClick={() => setActiveTab("ai-chat")}
              className={`p-5 text-left border rounded-sm flex items-center gap-4 transition-all cursor-pointer ${
                activeTab === "ai-chat"
                  ? "border-[#C9A84C] bg-[#C9A84C]/[0.04] text-[#FAF3E0]"
                  : "border-white/[0.02] bg-[#0E0C08] text-gray-500 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <MessageSquare className="w-5 h-5 text-[#C9A84C]" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wide">
                  {lang === "EN" ? "Sukhdev AI Expert" : "वैद्य सुखदेव AI"}
                </span>
                <span className="text-[10px] font-mono uppercase text-gray-600 mt-0.5 tracking-widest">
                  Live Chatbot
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("track")}
              className={`p-5 text-left border rounded-sm flex items-center gap-4 transition-all cursor-pointer ${
                activeTab === "track"
                  ? "border-[#C9A84C] bg-[#C9A84C]/[0.04] text-[#FAF3E0]"
                  : "border-white/[0.02] bg-[#0E0C08] text-gray-500 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <Truck className="w-5 h-5 text-[#C9A84C]" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wide">
                  {lang === "EN" ? "Track Package" : "ऑर्डर ट्रैक करें"}
                </span>
                <span className="text-[10px] font-mono uppercase text-gray-600 mt-0.5 tracking-widest">
                  Real-time Status
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("batch")}
              className={`p-5 text-left border rounded-sm flex items-center gap-4 transition-all cursor-pointer ${
                activeTab === "batch"
                  ? "border-[#C9A84C] bg-[#C9A84C]/[0.04] text-[#FAF3E0]"
                  : "border-white/[0.02] bg-[#0E0C08] text-gray-500 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <ShieldCheck className="w-5 h-5 text-[#C9A84C]" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wide">
                  {lang === "EN" ? "Lab Batch Reports" : "लैब क्रोमैटोग्राफी"}
                </span>
                <span className="text-[10px] font-mono uppercase text-gray-600 mt-0.5 tracking-widest">
                  Purity Chromatography
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("faqs")}
              className={`p-5 text-left border rounded-sm flex items-center gap-4 transition-all cursor-pointer ${
                activeTab === "faqs"
                  ? "border-[#C9A84C] bg-[#C9A84C]/[0.04] text-[#FAF3E0]"
                  : "border-white/[0.02] bg-[#0E0C08] text-gray-500 hover:text-white hover:bg-white/[0.01]"
              }`}
            >
              <BookOpen className="w-5 h-5 text-[#C9A84C]" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm tracking-wide">
                  {lang === "EN" ? "E-Shop Wisdom" : "उपयोग विधि और नियम"}
                </span>
                <span className="text-[10px] font-mono uppercase text-gray-600 mt-0.5 tracking-widest">
                  FAQ & Return Policy
                </span>
              </div>
            </button>
          </div>

          {/* Core Content Body (9 Cols) */}
          <div className="lg:col-span-9 bg-[#0E0C08] border border-white/[0.03] p-6 sm:p-10 rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col justify-between min-h-[480px]">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#C9A84C]/[0.02] rounded-full filter blur-2xl pointer-events-none" />

            {/* TAB 1: AI EXPERT CHATBOT */}
            {activeTab === "ai-chat" && (
              <div className="h-full flex flex-col justify-between animate-fade-in-up space-y-6">
                <div>
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#C9A84C] text-black font-serif font-black flex items-center justify-center text-xs shadow-md">
                        S
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-white">Sukhdev (Ayurvedic Wellness Expert)</h4>
                        <p className="text-[9px] font-mono text-green-400 tracking-wider uppercase flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                          <span>Gemini Powered Assistant</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/[0.02] px-2.5 py-1 rounded-sm">
                      D2C Care desk
                    </span>
                  </div>

                  {/* Message logging window */}
                  <div className="h-[260px] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
                    {messages.map((m, idx) => (
                      <div 
                        key={idx}
                        className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-serif ${m.role === "user" ? "bg-white/[0.08] text-white" : "bg-[#C9A84C] text-black font-black"}`}>
                          {m.role === "user" ? "U" : "S"}
                        </div>
                        <div className={`p-4 rounded-sm text-xs leading-relaxed font-light ${m.role === "user" ? "bg-white/[0.03] text-gray-200 border border-white/[0.02] rounded-tr-none" : "bg-[#181410] text-[#D4C4A0] border border-[#C9A84C]/10 rounded-tl-none font-serif"}`}>
                          {m.content}
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 max-w-[85%] mr-auto">
                        <div className="w-6 h-6 rounded-full bg-[#C9A84C] text-black font-serif font-black flex items-center justify-center text-[10px]">
                          S
                        </div>
                        <div className="p-3 bg-[#181410] border border-[#C9A84C]/10 rounded-sm text-xs text-gray-500 font-mono tracking-widest rounded-tl-none animate-pulse">
                          SUKHDEV IS WEAVING REMEDIES...
                        </div>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                </div>

                {/* Prepopulated Wellness query prompts for Amazon/Shopify helper feel */}
                <div>
                  <div className="flex gap-2 flex-wrap mb-4">
                    <button
                      onClick={(e) => handleSendMessage(e, "How can Tal Mishri treat child cough?")}
                      className="text-[10px] border border-white/[0.04] bg-white/[0.01] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C] px-3 py-1.5 rounded-full text-gray-400 font-light transition-all cursor-pointer"
                    >
                      {lang === "EN" ? "Cure Child Cough?" : "बच्चे की खांसी?"}
                    </button>
                    <button
                      onClick={(e) => handleSendMessage(e, "What are the shipping charges and timeline?")}
                      className="text-[10px] border border-white/[0.04] bg-white/[0.01] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C] px-3 py-1.5 rounded-full text-gray-400 font-light transition-all cursor-pointer"
                    >
                      {lang === "EN" ? "Delivery timelines?" : "डिलीवरी का समय?"}
                    </button>
                    <button
                      onClick={(e) => handleSendMessage(e, "How can I spot chemical sulfur bleaching candy?")}
                      className="text-[10px] border border-white/[0.04] bg-white/[0.01] hover:bg-[#C9A84C] hover:text-black hover:border-[#C9A84C] px-3 py-1.5 rounded-full text-gray-400 font-light transition-all cursor-pointer"
                    >
                      {lang === "EN" ? "Spot cheap fake sugar?" : "नकली चीनी का पता लगाएं?"}
                    </button>
                  </div>

                  {/* Chat Input form */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={lang === "EN" ? "Ask Sukhdev about remedies, low-GI values, dosing..." : "सुखदेव से रोग निदान या शुद्धता की जानकारी पूछें..."}
                      className="flex-grow bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-xs text-white px-4 py-3 outline-none rounded-sm transition-all font-sans"
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim() || isTyping}
                      className="px-5 bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-black rounded-sm flex items-center justify-center hover:shadow-[0_0_15px_rgba(201,168,76,0.3)] transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}


            {/* TAB 2: LIVE ORDER TRACKING */}
            {activeTab === "track" && (
              <div className="animate-fade-in-up space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {lang === "EN" ? "Track Sourced Gourmet Order" : "वॉयस और स्पीडपोस्ट ट्रैकिंग"}
                  </h4>
                  <p className="text-xs text-gray-500 font-light mb-6">
                    {lang === "EN" ? "Enter your 6-digit order credential (e.g. TG-182390) allocated during Checkout to trace direct dispatch records from Dumka, Jharkhand." : "चेकआउट या व्हाट्सएप पर प्राप्त 6-अंकों का आर्डर क्रेडेंशियल नंबर दर्ज करें।"}
                  </p>

                  {/* Track Input Form */}
                  <form id="track-form" onSubmit={handleTrackOrder} className="flex gap-2 max-w-md">
                    <div className="relative flex-grow">
                      <Search className="w-3.5 h-3.5 text-gray-600 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        placeholder="E.g., TG-182390"
                        className="w-full bg-black/60 border border-gray-800 focus:border-[#C9A84C] text-xs text-white pl-10 pr-4 py-3.5 outline-none rounded-sm transition-all font-mono tracking-wider uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSearchingTrack}
                      className="px-6 bg-[#181410] border border-white/[0.04] text-[#C9A84C] hover:bg-[#C9A84C]/10 text-xs font-mono tracking-widest uppercase rounded-sm transition-all cursor-pointer"
                    >
                      {isSearchingTrack ? "Searching..." : "TRACK"}
                    </button>
                  </form>

                  {/* Seed test ID prompts for Amazon level e-commerce feel */}
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-[10px] text-gray-600 font-mono">Test IDs:</span>
                    <button 
                      onClick={() => handleQuickTrack("TG-480102")} 
                      className="text-[10px] text-[#C9A84C] font-mono hover:underline cursor-pointer bg-transparent border-none"
                    >
                      TG-480102 (Delivered)
                    </button>
                    <span className="text-gray-700 text-[10px] font-mono">|</span>
                    <button 
                      onClick={() => handleQuickTrack("TG-719329")} 
                      className="text-[10px] text-[#C9A84C] font-mono hover:underline cursor-pointer bg-transparent border-none"
                    >
                      TG-719329 (In Transit)
                    </button>
                  </div>
                </div>

                {/* Error log if any */}
                {trackingError && (
                  <div className="p-4 bg-red-950/20 border border-red-500/20 text-red-400 text-xs rounded-sm">
                    {trackingError}
                  </div>
                )}

                {/* Detailed Interactive Sourced Shipment Timeline */}
                {trackingResult && (
                  <div className="mt-8 pt-6 border-t border-white/[0.03] space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white/[0.01] border border-white/[0.02] rounded-sm">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">ORDER UNIQUE SEGMENT</span>
                        <span className="font-serif font-black text-sm text-[#FAF3E0]">{trackingResult.orderId}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">DELIVERY RECIPIENT</span>
                        <span className="text-xs font-light text-gray-300">{trackingResult.customerDetails.customerName} ({trackingResult.customerDetails.state})</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">SHIPMENT STATUS</span>
                        <span className={`text-[10px] font-mono tracking-widest font-black uppercase px-2.5 py-1 rounded-sm ${trackingResult.status === "Delivered" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-amber-400/10 text-amber-300 border border-amber-400/20"}`}>
                          {trackingResult.status}
                        </span>
                      </div>
                    </div>

                    {/* Timeline Node Tree */}
                    <div className="relative border-l border-white/[0.04] ml-3.5 pl-6 space-y-8 py-2">
                      {trackingResult.timeline.map((step: any, idx: number) => {
                        const isLast = idx === trackingResult.timeline.length - 1;
                        return (
                          <div key={idx} className="relative">
                            {/* Dot indicator */}
                            <div className={`absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isLast 
                                ? "bg-[#C9A84C] border-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.6)]" 
                                : "bg-black border-white/[0.08]"
                            }`}>
                              {isLast && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                            </div>

                            {/* Node detail block */}
                            <div>
                              <div className="flex items-center gap-3">
                                <h5 className="font-serif font-bold text-sm text-gray-200">{step.title}</h5>
                                <span className="text-[10px] text-gray-500 font-mono">
                                  {new Date(step.time).toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 font-light mt-1 max-w-[500px] leading-relaxed flex items-center gap-1">
                                <CornerDownRight className="w-3 h-3 text-gray-700 shrink-0" />
                                <span>{step.desc}</span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* TAB 3: CHROMATOGRAPHY REPORTS */}
            {activeTab === "batch" && (
              <div className="animate-fade-in-up space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {lang === "EN" ? "Chromatography Batch Verification" : "बैच प्रयोगशाला रिपोर्ट विश्लेषण"}
                  </h4>
                  <p className="text-xs text-gray-500 font-light mb-6">
                    {lang === "EN" ? "Trace the scientific purity of your batch. Select your container code below to analyze real chromatography mineral deposits of Dumka's wild sap." : "अपनी जार पर अंकित बैच संख्या चुनकर पोटैशियम और रेंग शोधन अनुपात की जांच करें।"}
                  </p>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 font-medium">{lang === "EN" ? "Choose Batch:" : "बैच कोड चुनें:"}</span>
                    <div className="inline-flex rounded-sm p-1 bg-black/60 border border-gray-800">
                      <button
                        onClick={() => setSelectedBatch("TG-B26")}
                        className={`px-3 py-1 text-xs font-mono rounded-sm tracking-wider cursor-pointer ${selectedBatch === "TG-B26" ? "bg-[#C9A84C] text-black font-bold" : "text-gray-500"}`}
                      >
                        TG-B26 (May &apos;26)
                      </button>
                      <button
                        onClick={() => setSelectedBatch("TG-B25")}
                        className={`px-3 py-1 text-xs font-mono rounded-sm tracking-wider cursor-pointer ${selectedBatch === "TG-B25" ? "bg-[#C9A84C] text-black font-bold" : "text-gray-500"}`}
                      >
                        TG-B25 (April &apos;26)
                      </button>
                    </div>
                  </div>
                </div>

                {isLoadingBatch ? (
                  <div className="py-12 text-center text-gray-600 font-mono tracking-widest text-xs animate-pulse">
                    LOADING ADVANCED LAB SPECTROMID ANALYSIS...
                  </div>
                ) : batchReport && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.03]">
                    {/* Minerals & chemicals breakdown list */}
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A84C] block uppercase font-bold">
                        Trace Minerals & Contaminant Check
                      </span>

                      <div className="divide-y divide-white/[0.02]">
                        {batchReport.minerals.map((min: any, idx: number) => {
                          const isZero = min.amount === "0.00% Zero";
                          return (
                            <div key={idx} className="py-3 flex items-center justify-between gap-4">
                              <div>
                                <span className="text-xs font-serif font-bold text-gray-300 block">{min.name}</span>
                                <span className="text-[10px] text-gray-500 font-light mt-0.5 block">{min.role}</span>
                              </div>
                              <span className={`text-xs font-mono font-medium ${isZero ? "text-green-400" : "text-[#C9A84C]"}`}>
                                {min.amount}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Certifying Authority & summary */}
                    <div className="p-6 bg-[#060503] border border-white/[0.03] flex flex-col justify-between rounded-sm">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 justify-center py-1.5 px-3 bg-[#C9A84C]/5 border border-[#C9A84C]/10 rounded-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-mono tracking-wider font-semibold text-[#FAF3E0]">
                            {lang === "EN" ? `Ayurvedic Assay Score: ${batchReport.healthScore}` : `आयुर्वेदिक शुद्धता स्कोर: ${batchReport.healthScore}`}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">HARVEST GROUNDING</span>
                          <span className="text-xs text-gray-300 font-serif font-semibold">{batchReport.sourceForest}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">THERMAL METHOD</span>
                          <span className="text-xs text-gray-300 font-sans font-light">{batchReport.purificationMethod}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">ACCREDITING LABORATORY</span>
                          <span className="text-xs text-gray-400 font-serif italic">{batchReport.analyzedBy}</span>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/[0.03] mt-6 flex justify-between items-center text-[10px] text-gray-600 font-mono tracking-widest">
                        <span>TG LAB CERT BLOCK #27</span>
                        <span className="text-green-400 uppercase font-black font-mono">0% BLEACH CERTIFIED</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* TAB 4: FAQS & HELPDESK GUIDELINES */}
            {activeTab === "faqs" && (
              <div className="animate-fade-in-up space-y-8">
                {/* FAQs Container */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-lg text-white mb-2">
                    {lang === "EN" ? "Essential E-Boutique Wisdom FAQs" : "आवश्यक मार्गदर्शिका एवं प्रश्नोत्तर"}
                  </h4>
                  
                  <div className="space-y-2">
                    {faqs.map((f, idx) => {
                      const isExpanded = expandedFaq === idx;
                      return (
                        <div 
                          key={idx}
                          className="border border-white/[0.02] bg-white/[0.01] hover:bg-white/[0.02] rounded-sm transition-all overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                            className="w-full text-left p-4 flex items-center justify-between gap-4 font-serif font-semibold text-xs sm:text-sm text-gray-200 transition-colors cursor-pointer"
                          >
                            <span>{f.q}</span>
                            <span className="text-[#C9A84C] text-[18px] leading-none shrink-0">{isExpanded ? "−" : "+"}</span>
                          </button>
                          
                          {isExpanded && (
                            <div className="px-4 pb-4 text-xs font-light text-gray-400 border-t border-white/[0.02] pt-3 leading-relaxed">
                              {f.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Return guarantees & help ticket */}
                <div className="pt-6 border-t border-white/[0.04] grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone helpline support directory */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-[#C9A84C] block uppercase font-bold">
                      Direct Helplines & Return Desk
                    </span>

                    <ul className="space-y-2 text-xs text-gray-400 font-light font-sans">
                      <li className="flex items-center gap-3">
                        <PhoneCall className="w-4 h-4 text-[#C9A84C]" />
                        <span>Corporate Desk: +91 80028 24861</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Inbox className="w-4 h-4 text-[#C9A84C]" />
                        <span>Support Email: care@taadgiri.co</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-[#C9A84C]" />
                        <span>Available Hours: 9:00 AM - 7:00 PM (Monday-Saturday)</span>
                      </li>
                    </ul>

                    {/* Sourcing warning */}
                    <div className="p-4 bg-orange-400/[0.02] border border-orange-400/10 rounded-sm text-[10px] text-gray-500 leading-relaxed font-serif">
                      *Note: Sourced trees produce organic crystallization in batches. Minor caramel shades and crystal block dimensions will vary naturally. This proves 100% absence of chemical standardizing agents.
                    </div>
                  </div>

                  {/* Contact Support Ticket form */}
                  <form onSubmit={handleContactSubmit} className="space-y-3 bg-[#060503] p-5 border border-white/[0.02] rounded-sm">
                    <span className="text-[10px] font-mono tracking-[0.15em] text-gray-400 block uppercase">
                      File a Wellness Assistance Ticket
                    </span>

                    {contactSuccess ? (
                      <div className="py-8 text-center space-y-2">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto" />
                        <h5 className="font-serif text-sm font-semibold text-white">We Sourced Your Ticket</h5>
                        <p className="text-[10px] text-gray-500">Traditional helpdesk will email you within 12 hours.</p>
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            className="w-full bg-black/60 border border-gray-800 text-xs text-white p-2.5 outline-none rounded-sm"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            className="w-full bg-black/60 border border-gray-800 text-xs text-white p-2.5 outline-none rounded-sm"
                          />
                        </div>
                        <textarea
                          placeholder="Explain your disease remedy consultation or bulk order query..."
                          rows={2}
                          required
                          value={contactForm.query}
                          onChange={(e) => setContactForm({...contactForm, query: e.target.value})}
                          className="w-full bg-black/60 border border-gray-800 text-xs text-white p-2.5 outline-none rounded-sm resize-none"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitContact}
                          className="w-full py-2.5 bg-[#FAF3E0] text-black font-mono font-bold text-[10px] tracking-widest uppercase rounded-sm hover:shadow-md transition-all cursor-pointer"
                        >
                          {isSubmitContact ? "SUBMITTING..." : "SUBMIT TICKET"}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
