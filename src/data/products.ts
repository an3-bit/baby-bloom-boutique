// Seed data for baby shop products — prices in Kenya Shillings (KES)
import productClothing from "@/assets/product-clothing.jpg";
import productClothing2 from "@/assets/product-clothing-2.jpg";
import productClothing3 from "@/assets/product-clothing-3.jpg";
import productToys from "@/assets/product-toys.jpg";
import productToys2 from "@/assets/product-toys-2.jpg";
import productToys3 from "@/assets/product-toys-3.jpg";
import productFeeding from "@/assets/product-feeding.jpg";
import productFeeding2 from "@/assets/product-feeding-2.jpg";
import productFeeding3 from "@/assets/product-feeding-3.jpg";
import productBlanket from "@/assets/product-blanket.jpg";
import productBlanket2 from "@/assets/product-blanket-2.jpg";
import productBlanket3 from "@/assets/product-blanket-3.jpg";
import productShoes from "@/assets/product-shoes.jpg";
import productShoes2 from "@/assets/product-shoes-2.jpg";
import productBath from "@/assets/product-bath.jpg";
import productGear from "@/assets/product-gear.jpg";
import productGear2 from "@/assets/product-gear-2.jpg";
import productGear3 from "@/assets/product-gear-3.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  images: string[]; // Multiple images for sliding
  rating: number;
  reviews: number;
  badge?: string;
  sizes?: string[];
  inStock: boolean;
}

export type Category = "clothing" | "toys" | "feeding" | "bedding" | "shoes" | "bath" | "gear";

export const categories: { id: Category; name: string; emoji: string }[] = [
  { id: "clothing", name: "Clothing", emoji: "👶" },
  { id: "toys", name: "Toys", emoji: "🧸" },
  { id: "feeding", name: "Feeding", emoji: "🍼" },
  { id: "bedding", name: "Bedding", emoji: "🛏️" },
  { id: "shoes", name: "Shoes", emoji: "👟" },
  { id: "bath", name: "Bath", emoji: "🛁" },
  { id: "gear", name: "Gear", emoji: "🚼" },
];

/** Format price in Kenya Shillings */
export const formatKES = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Cotton Bear Onesie",
    description: "Ultra-soft organic cotton onesie with adorable bear ears hood. Perfect for everyday comfort. Machine washable and gentle on sensitive skin.",
    price: 2499,
    originalPrice: 3499,
    category: "clothing",
    images: [productClothing, productClothing2, productClothing3],
    rating: 4.8,
    reviews: 124,
    badge: "Sale",
    sizes: ["0-3m", "3-6m", "6-12m", "12-18m"],
    inStock: true,
  },
  {
    id: "2",
    name: "Pastel Wooden Stacking Rings",
    description: "Beautiful handcrafted wooden stacking rings in soft pastel colors. Non-toxic paint, smooth edges. Encourages motor skills development.",
    price: 1899,
    category: "toys",
    images: [productToys, productToys2, productToys3],
    rating: 4.9,
    reviews: 89,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "3",
    name: "Silicone Feeding Set",
    description: "BPA-free silicone bib, plate, and spoon set. Dishwasher safe, easy to clean, and designed for little hands learning to self-feed.",
    price: 2250,
    category: "feeding",
    images: [productFeeding, productFeeding2, productFeeding3],
    rating: 4.7,
    reviews: 67,
    inStock: true,
  },
  {
    id: "4",
    name: "Muslin Swaddle Blanket",
    description: "Luxuriously soft muslin swaddle blanket in cream. Breathable and lightweight, perfect for swaddling, nursing cover, or stroller blanket.",
    price: 1699,
    originalPrice: 2299,
    category: "bedding",
    images: [productBlanket, productBlanket2, productBlanket3],
    rating: 4.9,
    reviews: 203,
    badge: "Sale",
    inStock: true,
  },
  {
    id: "5",
    name: "Knitted Baby Booties",
    description: "Hand-knitted baby booties in soft pink with fleece lining. Elastic ankle ensures they stay on. Available in multiple sizes.",
    price: 1499,
    category: "shoes",
    images: [productShoes, productShoes2],
    rating: 4.6,
    reviews: 45,
    sizes: ["0-3m", "3-6m", "6-12m"],
    inStock: true,
  },
  {
    id: "6",
    name: "Baby Bath Essentials Kit",
    description: "Complete bath time kit with rubber duck, soft washcloth, and gentle baby wash. Tear-free formula, dermatologist tested.",
    price: 1999,
    category: "bath",
    images: [productBath, productFeeding2, productBlanket],
    rating: 4.8,
    reviews: 112,
    badge: "New",
    inStock: true,
  },
  {
    id: "7",
    name: "Premium Stroller Bundle",
    description: "Modern lightweight stroller with matching storage basket and accessories. Smooth ride, easy fold, suitable from newborn to 3 years.",
    price: 28999,
    originalPrice: 34999,
    category: "gear",
    images: [productGear, productGear2, productGear3],
    rating: 4.7,
    reviews: 56,
    badge: "Sale",
    inStock: true,
  },
  {
    id: "8",
    name: "Rainbow Stacking Blocks",
    description: "Colorful wooden stacking blocks that inspire creativity and develop spatial awareness. Made from sustainable beechwood.",
    price: 2999,
    category: "toys",
    images: [productToys3, productToys, productToys2],
    rating: 4.8,
    reviews: 78,
    inStock: true,
  },
  {
    id: "9",
    name: "Fleece-Lined Winter Onesie",
    description: "Cozy fleece-lined onesie perfect for cooler weather. Features snap buttons for easy changing and built-in foot covers.",
    price: 3299,
    category: "clothing",
    images: [productClothing3, productClothing, productClothing2],
    rating: 4.5,
    reviews: 34,
    sizes: ["0-3m", "3-6m", "6-12m", "12-18m"],
    inStock: true,
  },
  {
    id: "10",
    name: "Bamboo Baby Washcloths Set",
    description: "Set of 6 ultra-soft bamboo washcloths. Hypoallergenic, antibacterial, and incredibly gentle for daily use.",
    price: 1299,
    category: "bath",
    images: [productBath, productBlanket2, productBlanket],
    rating: 4.9,
    reviews: 156,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "11",
    name: "First Steps Leather Shoes",
    description: "Soft-sole leather shoes designed for first walkers. Flexible and breathable with non-slip soles for safe exploration.",
    price: 2799,
    category: "shoes",
    images: [productShoes2, productShoes],
    rating: 4.7,
    reviews: 92,
    sizes: ["3-6m", "6-12m", "12-18m"],
    inStock: true,
  },
  {
    id: "12",
    name: "Weighted Sleep Blanket",
    description: "Gently weighted blanket designed for better baby sleep. Mimics the feeling of being held. Organic cotton cover.",
    price: 3999,
    category: "bedding",
    images: [productBlanket3, productBlanket, productBlanket2],
    rating: 4.6,
    reviews: 88,
    badge: "New",
    inStock: true,
  },
];
