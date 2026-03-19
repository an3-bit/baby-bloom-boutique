import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground font-body mb-8">Looks like you haven't added any items yet.</p>
          <Link to="/catalog" className="btn-baby">Start Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
      <p className="text-muted-foreground font-body mb-8">{totalItems} item{totalItems !== 1 && "s"}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product.id}
                layout
                exit={{ opacity: 0, x: -50 }}
                className="flex gap-4 bg-card rounded-2xl p-4"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`} className="font-body font-semibold text-foreground text-sm hover:text-primary transition-colors line-clamp-1">
                    {item.product.name}
                  </Link>
                  {item.size && <p className="text-xs text-muted-foreground font-body">Size: {item.size}</p>}
                  <p className="font-body font-bold text-foreground mt-1">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-muted transition-colors rounded-l-lg">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm font-body font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-muted transition-colors rounded-r-lg">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="bg-card rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground font-medium">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground font-medium">{totalPrice >= 50 ? "Free" : "$5.99"}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-body">
              <span className="font-semibold text-foreground">Total</span>
              <span className="font-bold text-foreground text-lg">
                ${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}
              </span>
            </div>
          </div>
          {totalPrice < 50 && (
            <p className="text-xs text-muted-foreground font-body mb-4 bg-accent/50 rounded-lg p-3">
              🚚 Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
            </p>
          )}
          <button className="btn-baby w-full flex items-center justify-center gap-2">
            Checkout <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/catalog" className="block text-center text-sm text-muted-foreground hover:text-primary font-body mt-4 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
