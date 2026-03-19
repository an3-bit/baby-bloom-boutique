import { Link } from "react-router-dom";
import { ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatKES } from "@/data/products";
import ImageSlider from "@/components/ImageSlider";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-baby group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <ImageSlider
          images={product.images}
          alt={product.name}
          interval={3500 + index * 500}
          className="w-full h-full"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold font-body px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-body font-semibold text-foreground text-sm mb-1 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-baby-cream text-baby-cream" />
          <span className="text-xs text-muted-foreground font-body">
            {product.rating} ({product.reviews})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-body font-bold text-foreground text-sm">{formatKES(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatKES(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); addItem(product); }}
            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
