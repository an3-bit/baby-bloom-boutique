import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              tiny<span className="text-primary">bloom</span>
            </h3>
            <p className="text-muted-foreground text-sm font-body">
              Thoughtfully curated baby essentials for growing families.
            </p>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3 text-sm">Shop</h4>
            <ul className="space-y-2">
              {["Clothing", "Toys", "Feeding", "Bath"].map((l) => (
                <li key={l}>
                  <Link to={`/catalog?category=${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3 text-sm">Help</h4>
            <ul className="space-y-2">
              {["Shipping", "Returns", "Contact", "FAQ"].map((l) => (
                <li key={l}>
                  <span className="text-sm text-muted-foreground font-body cursor-default">{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-body font-semibold text-foreground mb-3 text-sm">Newsletter</h4>
            <p className="text-sm text-muted-foreground font-body mb-3">Get 10% off your first order</p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-l-lg border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg text-sm font-body font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-xs text-muted-foreground font-body">
          © 2026 tinybloom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
