import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingBag, Minus, Plus, Heart, Truck, RotateCcw, Shield, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products, categories, formatKES } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [activeImage, setActiveImage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="font-display text-xl font-bold text-foreground mb-2">Product not found</p>
        <p className="font-body text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/catalog" className="btn-baby">Back to Shop</Link>
      </div>
    );
  }

  const categoryData = categories.find(c => c.id === product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize);
    }
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
        <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/catalog" className="hover:text-primary transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          {categoryData && (
            <>
              <Link to={`/catalog?category=${product.category}`} className="hover:text-primary transition-colors">
                {categoryData.name}
              </Link>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl overflow-hidden bg-card border border-border/50 aspect-square mb-4 relative"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold font-body px-3 py-1.5 rounded-full ${
                  product.badge === "Sale"
                    ? "bg-destructive text-destructive-foreground"
                    : product.badge === "New"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}>
                  {product.badge}
                </span>
              )}
            </motion.div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      i === activeImage ? "border-primary shadow-md shadow-primary/20" : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-category">{categoryData?.emoji} {product.category}</span>
              {product.inStock ? (
                <span className="text-xs font-body font-medium text-secondary px-2 py-0.5 rounded-full bg-secondary/10">In Stock</span>
              ) : (
                <span className="text-xs font-body font-medium text-destructive px-2 py-0.5 rounded-full bg-destructive/10">Out of Stock</span>
              )}
            </div>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-baby-cream text-baby-cream" : "text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-body">
                {product.rating} · {product.reviews} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-foreground">{formatKES(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through font-body">{formatKES(product.originalPrice)}</span>
                  <span className="text-sm font-body font-bold text-destructive">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground font-body mb-6 leading-relaxed">{product.description}</p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-6">
                <label className="font-body text-sm font-semibold text-foreground mb-3 block">Select Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-5 py-2.5 rounded-full border text-sm font-body font-medium transition-all duration-200 ${
                        selectedSize === s
                          ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-border rounded-full bg-card">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-muted transition-colors rounded-l-full">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-body font-semibold text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-muted transition-colors rounded-r-full">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-baby flex-1 flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full border transition-all duration-200 ${
                  liked ? "border-destructive bg-destructive/10 text-destructive" : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-border">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Over KSh 5,000" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: Shield, label: "Secure Pay", sub: "M-Pesa & Card" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="font-body text-xs font-semibold text-foreground">{label}</p>
                  <p className="font-body text-[10px] text-muted-foreground">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-border/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">You might also like</h2>
                <p className="text-muted-foreground font-body text-sm mt-1">More from {categoryData?.name}</p>
              </div>
              <Link to={`/catalog?category=${product.category}`} className="text-sm font-body font-medium text-primary hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
