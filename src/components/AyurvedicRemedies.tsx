import { useState } from "react";
import { CheckCircle, Heart, Info, RotateCcw, ShieldAlert, ShieldCheck, Flame, Droplets, Eye } from "lucide-react";

interface AyurvedicRemediesProps {
  lang: "EN" | "HI";
}

export default function AyurvedicRemedies({ lang }: AyurvedicRemediesProps) {
  const [activeSegment, setActiveSegment] = useState<"recipes" | "purity">("recipes");

  // Remedies Data
  const remedies = [
    {
      id: "throat",
      icon: "🗣️",
      title: lang === "EN" ? "Throat Clear & Dry Cough Remedy" : "गले की खराश व सूखी खांसी",
      subtitle: lang === "EN" ? "Ages 2+ to Senior Citizens" : "२ वर्ष से अधिक उम्र के बच्चों व बड़ों के लिए",
      dosha: lang === "EN" ? "Pacifies Vata & Kapha Accumulation" : "वात और कफ दोषों का शमन",
      ingredients: lang === "EN" 
        ? ["20g Taad-Giri Premium Tal Mishri", "4-5 Black Cardamom grains (Elaichi)", "2-3 Whole Black Pepper (Kali Mirch)", "1 cup warm Organic A2 Milk"]
        : ["२० ग्राम ताड़-गिरी प्रीमियम मिश्री", "४-५ काली इलायची के दाने", "२-३ साबुत काली मिर्च", "१ कप गुनगुना ऑर्गनिक दूध"],
      instructions: lang === "EN"
        ? [
            "Grind cardamom, black pepper, and Taad-Giri Mishri into a fine composite powder.",
            "Stir 1/2 teaspoon of this herbal mixture into lukewarm milk.",
            "Have slowly at bedtime. Do not drink water for 30 minutes post intake.",
            "Acts as an organic demulcent, coating dry airways to prevent nighttime coughing fits."
          ]
        : [
            "इलायची दाने, काली मिर्च और ताड़-गिरी मिश्री को मिलाकर महीन चूर्ण तैयार करें।",
            "इस औषधीय चूर्ण का आधा चम्मच गुनगुने दूध में अच्छी तरह मिलाएँ।",
            "सोते समय इसका धीरे-धीरे सेवन करें। अगले ३० मिनट तक पानी का सेवन न करें।",
            "यह गले में एक मुलायम परत बनाता है जिससे रात में उठने वाले सूखी खांसी के दौरों से राहत मिलती है।"
          ]
    },
    {
      id: "immunity",
      icon: "🛡️",
      title: lang === "EN" ? "Toddler Digestion & Immunity Grid" : "बच्चों की पाचन शक्ति व रोग प्रतिरोधक क्षमता",
      subtitle: lang === "EN" ? "Natural Liver Tone-up" : "प्राकृतिक लीवर टॉनिक",
      dosha: lang === "EN" ? "Soothes Pitta & Balances Apana Vayu" : "पित्त शांत करता है और अपान वायु संतुलित करता है",
      ingredients: lang === "EN"
        ? ["10g Taad-Giri Tal Mishri crystals", "1/2 tsp crushed organic Fennel seeds (Saunf)", "3-4 Sweet Basil leaves (Tulsi)", "150ml pristine drinking water boiled and cooled"]
        : ["१० ग्राम ताड़-गिरी मिश्री", "आधा छोटा चम्मच पिसी सौंफ", "३-४ तुलसी के पत्ते", "१५० मिली उबला व गुनगुना पानी"],
      instructions: lang === "EN"
        ? [
            "Boil fennel seeds and sweet basil leaf together in water for 3-5 minutes.",
            "Warm-dissolve the raw golden Taad-Giri Mishri pebbles directly inside the infusion.",
            "Strain and serve 2-3 tablespoons to the child after heavy feeds.",
            "Safely calms intestinal gripes, bloating, colic pain, and cleanses oral pH."
          ]
        : [
            "एक बर्तन में पानी, सौंफ और तुलसी के पत्तों को ३-५ मिनट तक धीमी आंच पर उबालें।",
            "इस काढ़े में ताड़-गिरी के सुनहरे मिश्री क्रिस्टल डायरेक्ट डालकर अच्छी तरह घोलें।",
            "विधिपूर्वक छानकर २-३ छोटे चम्मच बच्चे को भोजन के उपरांत पिलाएं।",
            "यह बच्चों के पेट दर्द, गैस और मरोड़ (कॉलिक पैन) को शांत करता है और जीभ साफ रखता है।"
          ]
    },
    {
      id: "brain",
      icon: "🧠",
      title: lang === "EN" ? "Vedic Student Memory Booster" : "छात्रों हेतु वैदिक स्मरण शक्ति वर्धक",
      subtitle: lang === "EN" ? "Sustained Focus, No Crash" : "फोकस बढ़ाता है, तनाव से मुक्ति",
      dosha: lang === "EN" ? "Activates Prana Vayu & Calms Sadhaka Pitta" : "प्राण वायु जाग्रत करे और साधक पित्त शांत करे",
      ingredients: lang === "EN"
        ? ["15g Taad-Giri Tal Mishri rocks", "5 pieces peeled organic Almonds (Badam)", "1/2 tsp organic Cow Ghee", "A tiny pinch of pure Saffron (Kesar)"]
        : ["१५ ग्राम ताड़-गिरी मिश्री", "५ भीगे व छिली हुई गिरी बादाम", "आधा चम्मच गाय का शुद्ध घी", "शुद्ध केसर की सूक्ष्म पंखुड़ी"],
      instructions: lang === "EN"
        ? [
            "Weigh and crush unpeeled almonds and Taad-Giri sugar crystals to compile a rich paste.",
            "Slightly warm the ghee and incorporate into the almond-mishri matrix.",
            "Consume first thing at dawn, followed by a glass of lukewarm water or milk.",
            "Supplies raw Vitamin B12, essential zinc, and continuous low-GI energy to active minds."
          ]
        : [
            "भीगे हुए बादाम और ताड़-गिरी के शुद्ध क्रिस्टलों को सिलबट्टे या खरल में महीन पीस लें।",
            "गो-घृत (गाय के घी) को हल्का सा गर्म करके इस बादाम-मिश्री पेस्ट में मिलाएं।",
            "प्रातःकाल सूर्योदय के समय इसका सेवन करें, ऊपर से हल्का गुनगुना दूध या पानी पिएं।",
            "यह दिमाग को सतत ऊर्जा देता है, एकाग्रता प्रदान करता है और चिड़चिड़ापन शांत करता है।"
          ]
    }
  ];

  const [selectedRecipe, setSelectedRecipe] = useState(remedies[0].id);
  const activeRecipe = remedies.find(r => r.id === selectedRecipe) || remedies[0];

  // Purity Test Simulator States
  const [testStep, setTestStep] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [testHistory, setTestHistory] = useState<Array<{ step: number; choice: string }>>([]);

  const puritySteps = [
    {
      step: 1,
      title: lang === "EN" ? "Test 1: Visual Light Inspection" : "परीक्षण १: रंग व स्वरूप की जाँच",
      icon: <Eye className="w-6 h-6 text-[#C9A84C]" />,
      question: lang === "EN" ? "Inspect your current pantry mishri under light. What shape and color do you observe?" : "अपने घर की मिश्री को प्रकाश में ध्यान से देखें। उसका स्वरूप कैसा है?",
      choices: [
        {
          id: "fake_color",
          label: lang === "EN" ? "Prismatic perfectly white, translucent square cubes." : "एकदम सफेद, चमकदार चौकोर धागे वाले टुकड़े।",
          result: "danger",
          explain: lang === "EN" 
            ? "⚡ Warning: This is NOT Tal Mishri! Standard cane sugar is heavily bleached with sulfur dioxide to look snow-white. It spikes glucose levels instantly (GI ~68) and contains toxic sulfur residue."
            : "⚡ चेतावनी: यह असली ताड़ मिश्री नहीं है! गन्ने की साधारण चीनी को ब्लीच (सल्फर) द्वारा चमकाया जाता है। इसका ग्लाइसेमिक इंडेक्स बहुत अधिक होता है।"
        },
        {
          id: "pure_color",
          label: lang === "EN" ? "Irregular, hand-broken golden caramelized-brown stones." : "अनियमित आकार के सुनहरे गहरे कत्थई पत्थर जैसे क्रिस्टल।",
          result: "success",
          explain: lang === "EN"
            ? "🌿 100% Authentic! Raw, organic Palmyra nectar crystallizes into dense, irregular deep caramel clusters. Absolutely zero chemical bleaching has been done, preserving all minerals."
            : "🌿 शत-प्रतिशत प्रामाणिक! जंगली ताड़ का रस पकने के बाद प्राकृतिक भूरे रंग के सोंधे मोलासिस क्रिस्टल में बदलता है। बिना किसी रसायन ब्लीचिंग के।"
        }
      ]
    },
    {
      step: 2,
      title: lang === "EN" ? "Test 2: Heat Caramelization Test" : "परीक्षण २: मंद आंच दहन परीक्षण",
      icon: <Flame className="w-6 h-6 text-[#C9A84C]" />,
      question: lang === "EN" ? "Heat a small crystal in an iron spoon over a slow match fire. What aroma is released?" : "लोहे के चम्मच पर मिश्री का एक टुकड़ा चूल्हे की आंच पर थोड़ा गर्म करें। आपको कैसी महक आती है?",
      choices: [
        {
          id: "fake_fire",
          label: lang === "EN" ? "A pungent, sharp chemical smell resembling burning sulfur/plastic." : "तीखी, अप्रिय या कड़वी हवा, जैसे प्लास्टिक या तेजाब जल रहा हो।",
          result: "danger",
          explain: lang === "EN"
            ? "⚡ Danger: Adulteration confirmed. Standard industrial bleaching agents leave micro-traces of sulfites, which produce highly toxic fumes when exposed to thermal combustion. Discontinue culinary use."
            : "⚡ गंभीर चिंता: मिलावट की पुष्टि। रासायनिक सल्फर गैस जलने पर दम घोटने वाली गंध छोड़ती है। यह बच्चों की श्वसन नली के लिए बेहद नुकसानदेह है।"
        },
        {
          id: "pure_fire",
          label: lang === "EN" ? "Warm caramel, sweet organic sugarcane juice, or jaggery aroma." : "सोंधी मिठास वाली पके गुड़ या शानदार कैरेमल सौंधी खुशबू।",
          result: "success",
          explain: lang === "EN"
            ? "🌿 Pure Heritage Scent! Raw Palmyra sugar cooks gracefully without artificial blackening, giving off deep caramelizing jaggery fumes. It demonstrates absolute mineral retention."
            : "🌿 प्राकृतिक मिठास की पहचान! शुद्ध ताड़ रस जलने पर सोंधे गुड़ और लाजवाब कैरेमल वाष्प का उत्सर्जन करता है। यह शत-प्रतिशत सुरक्षित है।"
        }
      ]
    },
    {
      step: 3,
      title: lang === "EN" ? "Test 3: Ambient Dissolution Test" : "परीक्षण ३: शुद्ध जल विलेयता परीक्षण",
      icon: <Droplets className="w-6 h-6 text-[#C9A84C]" />,
      question: lang === "EN" ? "Let a crystal drop and sit silently in a clean glass of clear room-temperature water. How does it melt?" : "पानी से भरे कांच के गिलास में मिश्री का टुकड़ा डालें। वह पानी में किस प्रकार घुलती है?",
      choices: [
        {
          id: "fake_water",
          label: lang === "EN" ? "Dissolves in under 3 minutes, leaving a white powdery sediment at the bottom." : "२-३ मिनट में घुलकर नीचे सफेद चॉक जैसा अवशेष या पाउडर छोड़ जाती है।",
          result: "danger",
          explain: lang === "EN"
            ? "⚡ Warning: Adulterated with lime powder / urea. Cheaper manufacturers coat refined sugar crystals with calcium carbonate/lime to increase physical weight and retain false dryness."
            : "⚡ दोषपूर्ण: चूना पाउडर या यूरिया कोटेड चीनी। मिलावटी मिश्री का वजन कृत्रिम रूप से बढ़ाने के लिए उस पर चूने की कोटिंग की जाती है जो किडनी के लिए हानिकारक है।"
        },
        {
          id: "pure_water",
          label: lang === "EN" ? "Dissolves slowly over 8-10 minutes, leaving the water crystal clear and caramel-warm." : "धीमे-धीमे ८ मिनट में घुलकर पानी को बिल्कुल साफ और सोंधा-मीठा कर देती है।",
          result: "success",
          explain: lang === "EN"
            ? "🌿 Verified Absolute Purity! Original Palmyra sap crystals melt gently without any heavy residue. The drinking water remains crystal transparent, with a delightfully thin sweet texture."
            : "🌿 पूर्ण शुद्धता का साक्ष्य! ताड़-गिरी के मूल क्रिस्टल पानी में धीमे और पूर्ण रूप से मिल कर स्वच्छ मीठा विलायक बनाते हैं। कोई भी जहरीला अवशेष तली में जमा नहीं होता।"
        }
      ]
    }
  ];

  const currentPurityStep = puritySteps.find(s => s.step === testStep) || puritySteps[0];

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setTestHistory(prev => [...prev.filter(h => h.step !== testStep), { step: testStep, choice: choiceId }]);
  };

  const handleResetPurity = () => {
    setTestStep(1);
    setSelectedChoice(null);
    setTestHistory([]);
  };

  return (
    <section id="remedies-finder" className="py-24 md:py-32 bg-[#060503] border-t border-white/[0.04] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#C9A84C] font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase mb-4 block">
            {lang === "EN" ? "WELLNESS & INTEGRITY HARBOR" : "पारंपरिक कल्याण व शुद्धता जांच कल्प"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            {lang === "EN" ? "Ancient Wisdom, Interactive Care" : "प्राचीन ज्ञान, आधुनिक सरोकार"}
          </h2>
          <p className="text-xs text-gray-500 font-light mt-4 leading-relaxed max-w-lg mx-auto">
            {lang === "EN" 
              ? "Unveil real therapeutic recipes calculated precisely for your family, or utilize our home-purity simulator to inspect any store-bought alternatives."
              : "अपने परिवार के स्वास्थ्य के लिए सटीक और प्रामाणिक जड़ी-बूटी उपयोग विधि प्राप्त करें, या बाजार की मिलावटी चीनी का घर पर ही लाइव परीक्षण करना सीखें।"}
          </p>

          {/* Navigational segmented tabs with luxury gold outline */}
          <div className="flex justify-center mt-10">
            <div className="bg-[#120E0A] p-1 border border-white/[0.04] rounded-sm inline-flex gap-2">
              <button
                onClick={() => setActiveSegment("recipes")}
                className={`px-6 py-2.5 text-xs font-mono tracking-widest uppercase rounded-sm transition-all cursor-pointer ${
                  activeSegment === "recipes"
                    ? "bg-[#C9A84C] text-black font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🌿 {lang === "EN" ? "Healing Recipes" : "औषधीय नुस्खे"}
              </button>
              <button
                onClick={() => setActiveSegment("purity")}
                className={`px-6 py-2.5 text-xs font-mono tracking-widest uppercase rounded-sm transition-all cursor-pointer ${
                  activeSegment === "purity"
                    ? "bg-[#C9A84C] text-black font-bold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                🔬 {lang === "EN" ? "Purity diagnostic" : "मिलावट जाँच"}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display blocks */}
        {activeSegment === "recipes" ? (
          /* Segment 1: Healing recipe finder */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Sidebar selection tabs (4 columns) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <span className="text-[9px] font-mono tracking-wider text-gray-500 uppercase">
                {lang === "EN" ? "Select Healing Target" : "स्वास्थ्य लक्ष्य का चयन करें"}
              </span>
              {remedies.map(rem => (
                <button
                  key={rem.id}
                  onClick={() => setSelectedRecipe(rem.id)}
                  className={`w-full text-left p-5 border rounded-sm transition-all flex items-center gap-4 cursor-pointer hover:translate-x-1 duration-300 ${
                    selectedRecipe === rem.id
                      ? "bg-[#181410] border-[#C9A84C]/40"
                      : "bg-[#0E0C08] border-white/[0.03] hover:border-white/[0.1]"
                  }`}
                >
                  <span className="text-2xl">{rem.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-serif font-medium text-sm text-white group-hover:text-[#C9A84C]">
                      {rem.title}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono mt-0.5 leading-none">
                      {rem.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Core ingredients recipe formula sheet (8 columns) */}
            <div className="lg:col-span-8 bg-[#0E0C08] border border-white/[0.03] p-8 md:p-12 rounded-sm relative flex flex-col justify-between shadow-2xl">
              <div className="absolute top-6 right-8 text-[10px] font-mono tracking-widest text-[#C9A84C]/60 uppercase border border-[#C9A84C]/20 px-3 py-1 bg-[#181410] rounded-sm">
                {activeRecipe.dosha}
              </div>

              <div className="space-y-8">
                <div>
                  <span className="text-[32px] block mb-4">{activeRecipe.icon}</span>
                  <h3 className="font-serif text-2xl font-bold text-[#FAF3E0] leading-tight">
                    {activeRecipe.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-mono tracking-wider uppercase mt-1">
                    {activeRecipe.subtitle}
                  </p>
                </div>

                {/* Sub divided ingredient section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/[0.04]">
                  {/* Left sub col: list of elements (5 grid) */}
                  <div className="md:col-span-5 space-y-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block">
                      🛒 {lang === "EN" ? "Organic Elements" : "सामग्री आवश्यकता"}
                    </span>
                    <ul className="space-y-3">
                      {activeRecipe.ingredients.map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs font-light text-[#D4C4A0]">
                          <span className="text-[#C9A84C] font-bold">✓</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right sub col: steps (7 grid) */}
                  <div className="md:col-span-7 space-y-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-gray-500 block">
                      🥣 {lang === "EN" ? "Ayurvedic Concoction Steps" : "विधि व प्रयोग"}
                    </span>
                    <ol className="space-y-4 text-xs font-light text-gray-400">
                      {activeRecipe.instructions.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="font-mono text-[10px] text-[#C9A84C] font-black border border-[#C9A84C]/25 bg-[#14110C] rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Secure Trust Disclaimer */}
              <div className="mt-8 pt-6 border-t border-white/[0.03] flex items-center gap-3 text-gray-500 text-[10px]">
                <Info className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <span>
                  {lang === "EN" 
                    ? "Disclaimer: Traditional Ayurvedic recipes for dietary balancing. Please consult an Ayurvedic Acharya for specific diagnostic remedies."
                    : "अस्वीकरण: पारंपरिक और प्रमाणित घरेलू नुस्खे। गंभीर विकारों के निदान हेतु हमेशा योग्य आयुर्वेदिक चिकित्सक से संपर्क करें।"}
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* Segment 2: Home Purity Simulator Checker */
          <div className="max-w-4xl mx-auto bg-[#0E0C08] border border-white/[0.03] p-8 md:p-12 rounded-sm shadow-2xl space-y-8">
            
            {/* Simulation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/[0.04] pb-6 gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/60 border border-[#C9A84C]/20 rounded-sm">
                  {currentPurityStep.icon}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {currentPurityStep.title}
                  </h3>
                  <span className="text-[10px] font-mono tracking-widest text-[#C9A84C] uppercase">
                    Step {testStep} of 3 · interactive labs
                  </span>
                </div>
              </div>

              {/* Restart button */}
              <button
                onClick={handleResetPurity}
                className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>RESET TEST</span>
              </button>
            </div>

            {/* The Question card */}
            <div className="space-y-6">
              <p className="font-serif text-lg text-[#FAF3E0] leading-relaxed">
                {currentPurityStep.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentPurityStep.choices.map((choice) => {
                  const isSelected = selectedChoice === choice.id;
                  const hasAnswered = selectedChoice !== null;

                  return (
                    <button
                      key={choice.id}
                      disabled={hasAnswered}
                      onClick={() => handleChoiceSelect(choice.id)}
                      className={`text-left p-6 rounded-sm border transition-all flex flex-col justify-between h-full duration-300 ${
                        isSelected
                          ? choice.result === "success"
                            ? "bg-green-500/[0.03] border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.08)]"
                            : "bg-red-500/[0.03] border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.08)]"
                          : hasAnswered
                          ? "opacity-45 border-white/[0.02] bg-dense"
                          : "bg-[#14110C] border-white/[0.04] hover:border-[#C9A84C]/30 hover:bg-[#181410] cursor-pointer"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-500">
                            {choice.id.includes("fake") 
                              ? (lang === "EN" ? "Alternative Sugar" : "साधारण गन्ने की चीनी")
                              : (lang === "EN" ? "Pure Taad-Giri Sourcing" : "ताड़-गिरी मूल मिश्री")}
                          </span>
                          {isSelected && (
                            choice.result === "success" 
                              ? <ShieldCheck className="w-5 h-5 text-green-400" /> 
                              : <ShieldAlert className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                        <p className="text-sm font-medium text-white leading-relaxed">
                          {choice.label}
                        </p>
                      </div>

                      {/* Diagnostic response */}
                      {isSelected && (
                        <div className={`mt-6 p-4 rounded-sm border text-[11px] font-sans leading-relaxed transition-all ${
                          choice.result === "success"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : "bg-red-500/10 border-red-200/20 text-red-400"
                        }`}>
                          {choice.explain}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next buttons & milestones */}
            {selectedChoice && (
              <div className="pt-6 border-t border-white/[0.04] flex justify-between items-center animate-fade-in">
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  {lang === "EN" ? "Analysis Finished for Step " : "चरण समाप्त: "} # {testStep}
                </span>

                {testStep < 3 ? (
                  <button
                    onClick={() => {
                      setTestStep(prev => prev + 1);
                      setSelectedChoice(null);
                    }}
                    className="px-5 py-2.5 bg-[#C9A84C] hover:bg-[#FAF3E0] text-black font-mono font-bold text-[10px] tracking-widest uppercase rounded-sm transition-all"
                  >
                    {lang === "EN" ? "Proceed to Next Test" : "अगले परीक्षण पर जाएं"} →
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleResetPurity}
                      className="px-5 py-2.5 border border-gray-800 hover:border-[#C9A84C]/50 hover:bg-white/[0.01] text-gray-400 hover:text-white font-mono font-bold text-[10px] tracking-widest uppercase rounded-sm transition-all"
                    >
                      {lang === "EN" ? "TEST ANOTHER BATCH" : "पुनः परीक्षण शुरू करें"}
                    </button>
                    <a
                      href="#products"
                      className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-black font-mono font-bold text-[10px] tracking-widest uppercase rounded-sm transition-all shadow-[0_5px_15px_rgba(34,197,94,0.3)]"
                    >
                      🛒 {lang === "EN" ? "Buy Certified Pure Now" : "परम शुद्ध मिश्री खरीदें"}
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
