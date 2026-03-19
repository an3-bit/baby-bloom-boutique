import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, Heart, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/products";

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { to: "/", label: "Home" },
    { to: "/catalog", label: "Shop" },
    { to: "/catalog?category=clothing", label: "New Arrivals" },
    { to: "/catalog?category=toys", label: "Toys" },
    { to: "/catalog?category=gear", label: "Gear" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center text-xs font-body py-2 px-4">
        Free shipping on orders over KSh 5,000 🚚 | Lipa na M-Pesa
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b shadow-sm">
        {/* Top row: Logo, search, icons */}
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="font-display text-2xl font-bold text-foreground tracking-tight shrink-0">
            tiny<span className="text-primary">bloom</span>
          </Link>

          {/* Category dropdown + Search bar (desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xl">
            <div className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-2 bg-muted px-4 h-10 rounded-l-full font-body text-sm text-foreground border border-r-0 border-border hover:bg-accent transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full left-0 mt-1 bg-background border rounded-lg shadow-lg py-2 w-48 z-50"
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/catalog?category=${cat.id}`}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-body text-foreground hover:bg-accent transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <form onSubmit={handleSearch} className="flex flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-10 px-4 bg-background border border-border text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="h-10 w-10 bg-primary text-primary-foreground rounded-r-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <Link to="/auth" className="p-2 rounded-full hover:bg-muted transition-colors" title="Account">
              <User className="w-5 h-5 text-foreground" />
            </Link>
            <Link to="/cart" className="p-2 rounded-full hover:bg-muted transition-colors relative flex items-center gap-1" title="Cart">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
            <Link to="/catalog" className="p-2 rounded-full hover:bg-muted transition-colors" title="Wishlist">
              <Heart className="w-5 h-5 text-foreground" />
            </Link>
            {/* Mobile search */}
            <Link to="/catalog" className="md:hidden p-2 rounded-full hover:bg-muted transition-colors">
              <Search className="w-5 h-5 text-foreground" />
            </Link>
            <button
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Bottom row: Menu links (desktop) */}
        <div className="hidden md:block border-t border-border">
          <div className="container mx-auto px-4 flex items-center justify-center gap-8 h-10">
            {links.map((l) => (
              <Link
                key={l.to + l.label}
                to={l.to}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === l.to && !l.to.includes("?") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t bg-background"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="flex mb-3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-10 px-4 bg-muted rounded-l-full text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button type="submit" className="h-10 w-10 bg-primary text-primary-foreground rounded-r-full flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </button>
                </form>

                {links.map((l) => (
                  <Link
                    key={l.to + l.label}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="font-body text-base py-2 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}

                {/* Mobile categories */}
                <div className="border-t border-border mt-2 pt-2">
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider mb-2">Categories</p>
                  <div className="grid grid-cols-2 gap-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/catalog?category=${cat.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 py-2 px-2 rounded-lg text-sm font-body hover:bg-accent transition-colors"
                      >
                        <span>{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base py-2 hover:text-primary transition-colors border-t border-border mt-2 pt-3"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
