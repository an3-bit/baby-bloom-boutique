import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";

// Main hero products (large card) and side products (smaller card)
const mainProducts = products.filter((p) => p.badge).slice(0, 4);
const sideProducts = products.filter((p) => !p.badge || p.badge === "Bestseller").slice(0, 4);

export default function Hero() {
  const [mainIdx, setMainIdx] = useState(0);
  const [sideIdx, setSideIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIdx((prev) => (prev + 1) % mainProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSideIdx((prev) => (prev + 1) % sideProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const mainProduct = mainProducts[mainIdx];
  const sideProduct = sideProducts[sideIdx];

  return (
    <section className="bg-accent/20">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {/* Main large hero card */}
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden bg-card shadow-lg group cursor-pointer min-h-[320px] md:min-h-[420px]">
            <Link to={`/product/${mainProduct.id}`} className="block w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`main-${mainIdx}`}
                  src={mainProduct.images[0]}
                  alt={mainProduct.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`main-text-${mainIdx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-primary-foreground/70 text-sm font-body">{mainProduct.category}</span>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mt-1">
                      {mainProduct.name}
                    </h2>
                    {mainProduct.badge && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold">
                        {mainProduct.badge}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>

            {/* Slide indicators */}
            <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
              {mainProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setMainIdx(i); }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === mainIdx ? "w-6 bg-primary" : "w-2 bg-primary-foreground/50"
                  }`}
                  aria-label={`Show slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Side smaller card */}
          <div className="relative rounded-2xl overflow-hidden bg-card shadow-lg group cursor-pointer min-h-[250px] md:min-h-[420px]">
            <Link to={`/product/${sideProduct.id}`} className="block w-full h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`side-${sideIdx}`}
                  src={sideProduct.images[0]}
                  alt={sideProduct.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>

              {/* Overlay content */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent p-5 md:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`side-text-${sideIdx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-primary-foreground/70 text-xs font-body">{sideProduct.category}</span>
                    <h3 className="font-display text-lg md:text-xl font-bold text-primary-foreground mt-1">
                      {sideProduct.name}
                    </h3>
                    {sideProduct.badge && (
                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-body font-semibold">
                        {sideProduct.badge}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Link>

            {/* Slide indicators */}
            <div className="absolute bottom-3 right-4 flex gap-1.5 z-10">
              {sideProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); setSideIdx(i); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === sideIdx ? "w-5 bg-primary" : "w-1.5 bg-primary-foreground/50"
                  }`}
                  aria-label={`Show side slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
