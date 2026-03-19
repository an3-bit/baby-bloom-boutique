import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

const heroProducts = products.filter((p) => p.badge).slice(0, 5);

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const product = heroProducts[current];

  return (
    <section className="relative overflow-hidden bg-accent/30 min-h-[480px] md:min-h-[520px]">
      <div className="container mx-auto px-4 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left z-10">
          <span className="badge-category mb-4 inline-block">New Collection 2026</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight mb-4">
            Everything your <span className="text-primary">little one</span> needs
          </h1>
          <p className="text-muted-foreground font-body text-lg mb-8 max-w-md mx-auto md:mx-0">
            Thoughtfully curated essentials for babies. Organic, safe, and irresistibly adorable.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link to="/catalog" className="btn-baby">
              Shop Now
            </Link>
            <Link to="/catalog?category=clothing" className="btn-baby-outline">
              New Arrivals
            </Link>
          </div>
        </div>

        {/* Sliding hero image */}
        <div className="flex-1 max-w-lg relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square relative">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={product.images[0]}
                alt={product.name}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>
            {/* Product name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-body text-primary-foreground font-semibold text-sm"
                >
                  {product.name}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {heroProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
                aria-label={`Show slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
