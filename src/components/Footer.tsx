import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-background mb-3">
              tiny<span className="text-primary">bloom</span>
            </h3>
            <p className="text-sm font-body leading-relaxed mb-5 text-background/60">
              Thoughtfully curated baby essentials for growing families. Quality, comfort, and style for your little one.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary/20 hover:text-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body font-semibold text-background mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Products", to: "/catalog" },
                { label: "Clothing", to: "/catalog?category=clothing" },
                { label: "Toys", to: "/catalog?category=toys" },
                { label: "Feeding", to: "/catalog?category=feeding" },
                { label: "Bedding", to: "/catalog?category=bedding" },
                { label: "Gear", to: "/catalog?category=gear" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-background/50 hover:text-primary transition-colors font-body">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-body font-semibold text-background mb-4 text-sm uppercase tracking-wider">Help</h4>
            <ul className="space-y-2.5">
              {["Shipping & Delivery", "Returns & Exchanges", "Size Guide", "FAQ", "Terms & Conditions", "Privacy Policy"].map((l) => (
                <li key={l}>
                  <span className="text-sm text-background/50 hover:text-primary transition-colors font-body cursor-pointer">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-background mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-background/50 font-body">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-background/50 font-body">+254 700 123 456</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-background/50 font-body">hello@tinybloom.co.ke</span>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2 text-xs text-background/40 font-body">
              <span>We accept:</span>
              <span className="px-2 py-1 bg-background/10 rounded text-background/60 font-medium">M-Pesa</span>
              <span className="px-2 py-1 bg-background/10 rounded text-background/60 font-medium">Visa</span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/40 font-body">
            © 2026 tinybloom. All rights reserved.
          </p>
          <p className="text-xs text-background/30 font-body">
            Made with 💖 in Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
