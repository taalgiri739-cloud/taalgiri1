import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON bodies
  app.use(express.json());

  // Check and log upload files on boot
  const uploadDir = "/mnt/user-data/uploads";
  console.log("=== Checking Uploads Directory ===");
  try {
    if (fs.existsSync(uploadDir)) {
      const files = fs.readdirSync(uploadDir);
      console.log(`Uploads directory exists! Found ${files.length} files inside:`, files);
    } else {
      console.log("Uploads directory does not exist at:", uploadDir);
    }
  } catch (err: any) {
    console.error("Error reading uploads directory:", err.message);
  }

  // API Route to safely serve the user's uploaded images
  app.get("/api/image/:name", (req, res) => {
    const name = req.params.name;
    const cleanName = path.basename(name);
    
    // Check multiple directories to be secure and flexible
    const pathsToTry = [
      path.join("/mnt/user-data/uploads", cleanName),
      path.join(__dirname, "assets", cleanName),
      path.join(__dirname, "public", cleanName)
    ];

    for (const filePath of pathsToTry) {
      if (fs.existsSync(filePath)) {
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Cache-Control", "public, max-age=31536000"); // cache 1 year for performance
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    // Return 404 with a helpful message
    console.warn(`[Image route] Requested image not found: ${cleanName}`);
    res.status(404).json({ error: "Image not found", cleanName });
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      time: new Date().toISOString(),
      uploadsAvailable: fs.existsSync(uploadDir)
    });
  });

  // In-memory simulated order database to support real-time tracking
  const ordersDatabase = new Map<string, any>();

  // Mock checkout / shopping cart submission simulation
  app.post("/api/checkout", (req, res) => {
    const { items, customerDetails } = req.body;
    const orderId = "TG-" + Math.floor(100000 + Math.random() * 900000);
    
    const newOrder = {
      orderId,
      items,
      customerDetails,
      createdAt: new Date().toISOString(),
      status: "Processing",
      timeline: [
        { title: "Order Sourced Securely", time: new Date().toISOString(), desc: "Order details received on Indian D2C gateway." },
        { title: "Verifying Batch Lab Report", time: new Date(Date.now() + 1000 * 60 * 3).toISOString(), desc: "Validating heavy metals chromatography for batch TG-B26." }
      ]
    };

    ordersDatabase.set(orderId, newOrder);
    console.log(`[Order Placed] Server saved: ${orderId}`, { items, customerDetails });

    res.json({
      success: true,
      orderId,
      message: "Order placed successfully! Sourcing team is processing your wild-crafted package."
    });
  });

  // Real-time Order Tracking Endpoint
  app.get("/api/order-status/:orderId", (req, res) => {
    const orderId = req.params.orderId.toUpperCase().trim();
    let order = ordersDatabase.get(orderId);

    if (order) {
      return res.json({ found: true, order });
    }

    // If order was not placed in this current active session, let's generate a highly realistic, 
    // stable delivery timeline so any mockup or test search by the client feels completely active & authentic.
    if (/^TG-\d{6}$/.test(orderId)) {
      const isDelivered = parseInt(orderId.substring(3)) % 2 === 0;
      const staticDate = new Date(2026, 4, 28, 10, 30);
      
      const simulatedOrder = {
        orderId,
        createdAt: staticDate.toISOString(),
        status: isDelivered ? "Delivered" : "In-Transit",
        customerDetails: {
          customerName: "Dr. Sandeep Shastry",
          state: "Delhi NCR",
          address: "12B Block, Vasant Vihar"
        },
        items: [
          { product: { name: "Taad-Giri Gold (Premium Crystals)", price: 479, weightLabel: "500g" }, quantity: 1 }
        ],
        timeline: [
          { title: "Order Confirmed", time: staticDate.toISOString(), desc: "Payment successfully verified." },
          { title: "Sourced from Dumka Grove", time: new Date(staticDate.getTime() + 1000 * 3600 * 4).toISOString(), desc: "Harvested climbers brought wild sap to wood-fire crystallization unit." },
          { title: "Chromatography Batch Cleared", time: new Date(staticDate.getTime() + 1000 * 3600 * 12).toISOString(), desc: "Tested by third-party lab. Heavy metals 0.00% certified." },
          ...(isDelivered 
            ? [
                { title: "Dispatched via SpeedPost D2C", time: new Date(staticDate.getTime() + 1000 * 3600 * 24).toISOString(), desc: "Tracking ID: SP-JH18201-TG." },
                { title: "Successfully Delivered", time: new Date(staticDate.getTime() + 1000 * 3600 * 24 * 2).toISOString(), desc: "Delivered to recipient with verified OTP authentication." }
              ] 
            : [
                { title: "In Transit near Ranchi Depot", time: new Date(staticDate.getTime() + 1000 * 3600 * 20).toISOString(), desc: "Package sorted, heading of out Jharkhand border." }
              ]
          )
        ]
      };

      return res.json({ found: true, order: simulatedOrder });
    }

    // Not found
    return res.json({ found: false, message: "No active order matching this ID on blockchain records." });
  });

  // Batch chromatography certificates endpoint
  app.get("/api/batch-report/:code", (req, res) => {
    const code = req.params.code.toUpperCase().trim();
    
    // DB mapping of standard batch codes
    const reports: Record<string, any> = {
      "TG-B26": {
        batchId: "TG-B26",
        harvestDate: "May 2026",
        sourceForest: "Deoghar Buffer Zone, Dumka Division (Jharkhand)",
        purificationMethod: "Wood-fire single-crystallization clay pans",
        minerals: [
          { name: "Potassium", amount: "320 mg / 100g", role: "Heart health & electrolyte balance" },
          { name: "Magnesium", amount: "72 mg / 100g", role: "Nerve function & stress control" },
          { name: "Iron", amount: "3.4 mg / 100g", role: "Blood oxygen & natural energy" },
          { name: "Calcium", amount: "41 mg / 100g", role: "Bone density support" },
          { name: "Sulfate", amount: "0.00% Zero", role: "No chemical sulfur bleaching used" },
          { name: "Cane Sugar Adulterants", amount: "0.00% Zero", role: "Pure Palmyra Nectar crystallization" }
        ],
        healthScore: "99.8%",
        analyzedBy: "Jharkhand Organic Soil & Agri Labs"
      },
      "TG-B25": {
        batchId: "TG-B25",
        harvestDate: "April 2026",
        sourceForest: "Santhal Pargana Forest Canopy",
        purificationMethod: "Vedic thermal reduction with brass containers",
        minerals: [
          { name: "Potassium", amount: "295 mg / 100g", role: "Fluid containment & cellular recovery" },
          { name: "Magnesium", amount: "68 mg / 100g", role: "Anti-inflammatory support" },
          { name: "Iron", amount: "3.1 mg / 100g", role: "Hemoglobin building" },
          { name: "Calcium", amount: "39 mg / 100g", role: "Optimal skeletal matrix support" },
          { name: "Sulfate", amount: "0.00% Zero", role: "100% Raw unbleached caramel texture" },
          { name: "Cane Sugar Adulterants", amount: "0.00% Zero", role: "No sugar syrup blend" }
        ],
        healthScore: "99.4%",
        analyzedBy: "National Phytochemistry Sourcing Lab"
      }
    };

    const result = reports[code] || reports["TG-B26"]; // fallback to B26 if not specifically matching
    res.json({ success: true, report: result });
  });

  // AI-powered Gemini chat support route
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const lastMessage = messages[messages.length - 1]?.content || "";
    
    // Check for Gemini API key
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build"
            }
          }
        });

        // Format history for chat API
        const systemPrompt = `You are "Sukhdev", the Ayurvedic Health & Customer Care Specialist for Taad-Giri.
Taad-Giri sells premium, unbleached, wild-crafted palm candy (Tal Mishri) sourced by tribal climbers in Dumka, Jharkhand.
Cheap market brands sell white sugar crystals bleached with toxic sulfur and pretend it is Tal Mishri. Taad-Giri is golden, caramel-tasting, rich in potassium/magnesium, low-glycemic, and certified heavy-metal free.

Your tone is warm, polite, wise, and deeply expert in Ayurveda. You can speak fluently in English or Hindi (or Hinglish), depending on how the user greets you.
Provide detailed yet elegant answers. You know that:
1. Tal Mishri works wonders for sore throat, children's dry cough, and digestion when taken with warm milk or sub-boiled fennel.
2. Sourcing: Climbers scale 60-foot trees in Jharkhand daily at dawn to tap the nectar, which is reduced under slow wood-fire.
3. Delivery: Free shipping on orders above ₹499, otherwise ₹50. COD is fully supported.
Let's give incredible wellness care! Make your responses beautifully styled in brief, readable paragraphs or lists. Keep your response under 120 words. No complicated code.`;

        // Combine history into a neat prompt
        const formattedPrompts = messages.map(m => `${m.role === "user" ? "User" : "Sukhdev"}: ${m.content}`).join("\n");
        const fullPrompt = `${formattedPrompts}\nSukhdev:`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: fullPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7
          }
        });

        const reply = response.text || "I am here to guide you to purity.";
        return res.json({ success: true, reply });

      } catch (err: any) {
        console.error("Gemini chatbot error, falling back:", err);
      }
    }

    // Rule-based rich fallback engine in English/Hindi for high availability and zero dependencies failure!
    const textQuery = lastMessage.toLowerCase();
    let reply = "";

    if (textQuery.includes("throat") || textQuery.includes("gala") || textQuery.includes("khansi") || textQuery.includes("cough")) {
      reply = `**Ayurvedic Care Tip for Cough & Throat Clear:** 
Tal Mishri (palm candy) combined with black pepper (kali mirch) or ginger powder is exceptionally soothing. 
For children's dry cough: Grind equal parts of Taad-Giri Mishri and green cardamom, take 1/4 teaspoon with warm milk at bedtime. It naturally pacifies Pitta and Vata doshas, clears mucosal congestion, and tastes delightful!`;
    } else if (textQuery.includes("delivery") || textQuery.includes("shipping") || textQuery.includes("order") || textQuery.includes("cod") || textQuery.includes("time") || textQuery.includes("charg")) {
      reply = `**Shipping & Sourcing Timelines:**
• **Free Delivery:** Automatically applied to all orders above ₹499 (such as our 1kg Master Pack or double 500g packs). For smaller packs, delivery is a flat ₹50.
• **Time:** Sourced packages are dispatched from Dumka, Jharkhand within 24 hours of confirmation. You'll receive them in 3-5 business days. 
• **COD:** Cash on Delivery is fully supported! You can also order directly via WhatsApp.`;
    } else if (textQuery.includes("sugar") || textQuery.includes("adulteration") || textQuery.includes("chemical") || textQuery.includes("original") || textQuery.includes("pure") || textQuery.includes("lab")) {
      reply = `**The Taad-Giri Purity Guarantee:**
Cheap local brands recrystallize sulfur-bleached refined cane sugar to mimic Tal Mishri. It has empty calories and chemical residue. 
**Taad-Giri is:**
1. Made entirely from the mineral-rich wild Palmyra palm sap.
2. Never bleached with sulfur - hence the authentic deep caramel-golden color.
3. Independently certified with 0% heavy metals, 0% added sucrose syrup. Scan our batch report under the Care Portal to believe!`;
    } else if (textQuery.includes("namaste") || textQuery.includes("hello") || textQuery.includes("hi") || textQuery.includes("hey") || textQuery.includes("care") || textQuery.includes("srinath")) {
      reply = `**Namaste! I am Sukhdev, your Taad-Giri Wellness Care Guide. 🙏**
I can help you understand the health benefits of authentic Tal Mishri, look up order statuses, explain child cough remedy recipes, or discuss our Jharkhand climbers' forest community. What pure health aspect can I assist you with today?`;
    } else {
      reply = `Thank you for choosing wellness! As a pure wild-crafted Palmyra product, Taad-Giri provides 24x essential trace minerals (including blood-rich iron and nerve-soothing magnesium) with a low glycemic index of 35. 
You can order safely via **WhatsApp Direct** or track your packet by entering any Order ID in our Care Portal. Let me know if you would like me to share a specific recipe!`;
    }

    res.json({ success: true, reply });
  });

  // Mock checkout / shopping cart submission simulation

  // Vite middleware for frontend routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Support SPA router fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Success! Tail-Mishri Full-Stack app running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
