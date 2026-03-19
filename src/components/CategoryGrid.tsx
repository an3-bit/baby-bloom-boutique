import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/products";

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="font-display text-3xl font-bold text-center text-foreground mb-2">Shop by Category</h2>
      <p className="text-muted-foreground text-center font-body mb-10">Find exactly what you need</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
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
              className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-card hover:bg-accent/50 transition-all duration-300 hover:shadow-md"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="font-body text-sm font-medium text-foreground">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
