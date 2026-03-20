import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

const categoryColors = [
  "from-primary/10 to-primary/5",
  "from-baby-cream/30 to-baby-cream/10",
  "from-secondary/15 to-secondary/5",
  "from-baby-lavender/20 to-baby-lavender/5",
  "from-baby-peach/20 to-baby-peach/5",
  "from-primary/8 to-accent/10",
  "from-secondary/10 to-baby-cream/10",
];

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
        <p className="text-muted-foreground font-body text-sm">Find exactly what you need</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={`/catalog?category=${cat.id}`}
              className={`flex flex-col items-center gap-2.5 p-5 md:p-6 rounded-2xl bg-gradient-to-br ${categoryColors[i % categoryColors.length]} border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group`}
            >
              <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
              <span className="font-body text-xs md:text-sm font-semibold text-foreground">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
