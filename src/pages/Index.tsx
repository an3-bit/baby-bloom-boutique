import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Index = () => {
  // Featured products = those with badges or highest rated
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const bestsellers = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Hero />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold text-center text-foreground mb-2">Featured Products</h2>
        <p className="text-muted-foreground text-center font-body mb-10">Hand-picked favorites for your little one</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-3xl font-bold text-center text-foreground mb-2">Bestsellers</h2>
        <p className="text-muted-foreground text-center font-body mb-10">Loved by thousands of parents</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Trust banner */}
      <section className="bg-accent/30 py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "🌿", title: "Eco Friendly", desc: "Sustainable materials" },
            { icon: "💝", title: "Gift Wrapping", desc: "Free on all orders" },
          ].map((item) => (
            <div key={item.title}>
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <h3 className="font-body font-semibold text-foreground text-sm">{item.title}</h3>
              <p className="text-muted-foreground text-xs font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
