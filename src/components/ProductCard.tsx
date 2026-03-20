import { Link } from "react-router-dom";
import { ShoppingBag, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/data/products";
import ImageSlider from "@/components/ImageSlider";
import { useState } from "react";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();
  const [liked, setLiked] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <ImageSlider
          images={product.images}
          alt={product.name}
          interval={3500 + index * 500}
          className="w-full h-full"
        />
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 text-xs font-bold font-body px-3 py-1 rounded-full ${
            product.badge === "Sale"
              ? "bg-destructive text-destructive-foreground"
              : product.badge === "New"
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          }`}>
            {product.badge}
          </span>
        )}
        {/* Discount % */}
        {discount && (
          <span className="absolute top-3 right-3 z-10 bg-foreground/80 text-background text-[10px] font-bold font-body px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className={`p-2.5 rounded-full shadow-lg hover:scale-110 transition-transform ${
              liked ? "bg-destructive text-destructive-foreground" : "bg-background text-foreground"
            }`}
            aria-label="Add to wishlist"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? "fill-baby-cream text-baby-cream"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground font-body">
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body font-bold text-foreground text-sm">{formatKES(product.price)}</span>
            {product.originalPrice && (
              <span className="text-[11px] text-muted-foreground line-through">
                {formatKES(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
