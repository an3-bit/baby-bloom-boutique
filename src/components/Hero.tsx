import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBaby from "@/assets/hero-baby.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-accent/30">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center md:text-left"
        >
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
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 max-w-lg"
        >
          <img
            src={heroBaby}
            alt="Cute baby items flat lay with teddy bear, booties, and wooden rattle"
            className="rounded-3xl shadow-2xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
