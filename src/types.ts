export interface Product {
  id: string;
  name: string;
  hindiName: string;
  weightGrams: number;
  weightLabel: string;
  price: number;
  mrp: number; // For Flipkart/Amazon-style striking discount
  rating: number;
  ratingCount: number;
  description: string;
  hindiDescription: string;
  benefits: string[];
  imageName: string;
  tag?: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  hindiComment: string;
  verified: boolean;
  source: "Amazon" | "Flipkart" | "WhatsApp" | "Direct Website";
  avatarText: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

import brandLogoImg from "./assets/images/brand_logo_1780038817731.png";
import productPouchImg from "./assets/images/product_pouch_1780038843406.png";
import productJarsLineupImg from "./assets/images/product_jars_1780038865699.png";
import palmForestImg from "./assets/images/palm_forest_1780038891592.png";
import palmDuskImg from "./assets/images/palm_dusk_1780038921127.png";
import palmGroveImg from "./assets/images/palm_grove_1780038943723.png";
import harvesterClimbingImg from "./assets/images/harvester_climbing_1780038968770.png";
import mishriInBowlImg from "./assets/images/mishri_bowl_1780039003220.png";
import mishriCloseSpreadImg from "./assets/images/mishri_spread_1780039050187.png";
import boilingSapCauldronImg from "./assets/images/boiling_sap_1780039024147.png";

// Map genuine user-provided image assets served from secure uploads directory
export const IMAGES = {
  // Hero Background & Landscapes
  palmForest: palmForestImg,
  palmDusk: palmDuskImg,
  palmGrove: palmGroveImg,
  
  // Harvesting & Process Steps
  harvesterClimbing: harvesterClimbingImg,
  harvesterClayPots: harvesterClimbingImg,
  palmFruitCluster: palmGroveImg,
  
  // Mishri Closeup & Crafting
  mishriInBowl: mishriInBowlImg,
  mishriCloseSpread: mishriCloseSpreadImg,
  boilingSapCauldron: boilingSapCauldronImg,
  
  // Branding & Product Lineups
  brandLogo: brandLogoImg,
  productPouch: productPouchImg,
  productJarsLineup: productJarsLineupImg
};
