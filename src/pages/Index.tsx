import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products, formatKES } from "@/data/products";

const Index = () => {
  const featured = products.filter((p) => p.badge).slice(0, 8);
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);
  const newArrivals = products.filter((p) => p.badge === "New").slice(0, 4);

  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-body font-medium text-primary uppercase tracking-wider">Curated</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground font-body text-sm mt-1">Hand-picked favorites for your little one</p>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-1 text-sm font-body font-medium text-primary hover:gap-2 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="md:hidden text-center mt-6">
          <Link to="/catalog" className="btn-baby-outline text-sm">View All Products</Link>
        </div>
      </section>

      {/* New Arrivals Banner */}
      {newArrivals.length > 0 && (
        <section className="bg-gradient-to-r from-primary/5 via-accent/20 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-sm font-body font-medium text-secondary uppercase tracking-wider">Just landed</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">New Arrivals</h2>
              </div>
              <Link to="/catalog" className="hidden md:flex items-center gap-1 text-sm font-body font-medium text-primary hover:gap-2 transition-all">
                Shop new <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              {newArrivals.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bestsellers */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-body font-medium text-primary uppercase tracking-wider">Popular</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Bestsellers</h2>
            <p className="text-muted-foreground font-body text-sm mt-1">Loved by thousands of parents</p>
          </div>
          <Link to="/catalog" className="hidden md:flex items-center gap-1 text-sm font-body font-medium text-primary hover:gap-2 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-card border-y border-border/50 py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: "🚚", title: "Free Shipping", desc: `On orders over ${formatKES(5000)}` },
            { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "📱", title: "Lipa na M-Pesa", desc: "Simple mobile payment" },
            { icon: "💝", title: "Gift Wrapping", desc: "Free on all orders" },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="font-body font-semibold text-foreground text-sm mb-1">{item.title}</h3>
              <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 via-accent/30 to-secondary/10 rounded-3xl p-8 md:p-12 text-center border border-border/50"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            Join the Tinybloom Family 💛
          </h2>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            Subscribe to our newsletter for exclusive deals, parenting tips, and new arrivals.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-5 py-3 rounded-l-full border border-r-0 border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-r-full text-sm font-body font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
