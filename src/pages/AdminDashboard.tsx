import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, ShoppingCart, Tag, LayoutDashboard, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { formatKES } from "@/data/products";
import { toast } from "sonner";

type Tab = "products" | "orders" | "categories";

export default function AdminDashboard() {
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("products");

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [loading, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "categories", label: "Categories", icon: Tag },
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-8 border-b pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-body text-sm font-medium transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "products" && <ProductsTab />}
        {tab === "orders" && <OrdersTab />}
        {tab === "categories" && <CategoriesTab />}
      </div>
    </div>
  );
}

/* ===================== Products Tab ===================== */
function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", original_price: "", category_id: "",
    badge: "", sizes: "", in_stock: true, images: "",
  });

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*, categories(name, emoji)").order("created_at", { ascending: false });
    setProducts(data || []);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*");
    setCategories(data || []);
  };

  useEffect(() => { fetchProducts(); fetchCategories(); }, []);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", original_price: "", category_id: "", badge: "", sizes: "", in_stock: true, images: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: any) => {
    setForm({
      name: p.name, description: p.description || "", price: String(p.price),
      original_price: p.original_price ? String(p.original_price) : "",
      category_id: p.category_id || "", badge: p.badge || "",
      sizes: (p.sizes || []).join(", "), in_stock: p.in_stock ?? true,
      images: (p.images || []).join("\n"),
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      description: form.description || null,
      price: parseInt(form.price),
      original_price: form.original_price ? parseInt(form.original_price) : null,
      category_id: form.category_id || null,
      badge: form.badge || null,
      sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean) : [],
      in_stock: form.in_stock,
      images: form.images ? form.images.split("\n").map((s) => s.trim()).filter(Boolean) : [],
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) { toast.error(error.message); return; }
      toast.success("Product updated");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) { toast.error(error.message); return; }
      toast.success("Product created");
    }
    resetForm();
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchProducts(); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-bold text-foreground">{products.length} Products</h2>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-baby flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 mb-6 border">
          <h3 className="font-body font-semibold text-foreground mb-4">{editingId ? "Edit Product" : "New Product"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input placeholder="Product name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
            </select>
            <input placeholder="Price (KES) *" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Original price (KES)" type="number" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Badge (e.g. Sale, New)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <input placeholder="Sizes (comma separated)" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className="px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="md:col-span-2 px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <textarea placeholder="Image URLs (one per line)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} rows={3} className="md:col-span-2 px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <label className="flex items-center gap-2 font-body text-sm">
              <input type="checkbox" checked={form.in_stock} onChange={(e) => setForm({ ...form, in_stock: e.target.checked })} className="rounded" />
              In Stock
            </label>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} disabled={!form.name || !form.price} className="btn-baby text-sm disabled:opacity-50">
              {editingId ? "Update" : "Create"}
            </button>
            <button onClick={resetForm} className="btn-baby-outline text-sm">Cancel</button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-card rounded-2xl overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Product</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Price</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Stock</th>
                <th className="text-right px-4 py-3 font-body text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] && <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                      <div>
                        <p className="font-body text-sm font-medium text-foreground">{p.name}</p>
                        {p.badge && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-body">{p.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground">
                    {p.categories ? `${p.categories.emoji} ${p.categories.name}` : "—"}
                  </td>
                  <td className="px-4 py-3 font-body text-sm font-medium text-foreground">{formatKES(p.price)}</td>
                  <td className="px-4 py-3">
                    {p.in_stock ? (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full font-body">In Stock</span>
                    ) : (
                      <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full font-body">Out</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(p)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Pencil className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground font-body">No products yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== Orders Tab ===================== */
function OrdersTab() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success(`Order marked as ${status}`); fetchOrders(); }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-baby-cream text-accent-foreground",
    confirmed: "bg-baby-mint text-accent-foreground",
    fulfilled: "bg-secondary text-secondary-foreground",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-foreground mb-6">{orders.length} Orders</h2>
      <div className="bg-card rounded-2xl overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Order ID</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Total</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-body text-xs font-medium text-muted-foreground">M-Pesa Ref</th>
                <th className="text-right px-4 py-3 font-body text-xs font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-body text-sm text-foreground font-mono">{o.id.slice(0, 8)}...</td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-4 py-3 font-body text-sm font-medium text-foreground">{formatKES(o.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-body font-medium ${statusColors[o.status] || "bg-muted text-muted-foreground"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-body text-sm text-muted-foreground">{o.mpesa_ref || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      {o.status === "pending" && (
                        <button onClick={() => updateStatus(o.id, "confirmed")} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Confirm">
                          <Check className="w-4 h-4 text-secondary-foreground" />
                        </button>
                      )}
                      {(o.status === "pending" || o.status === "confirmed") && (
                        <button onClick={() => updateStatus(o.id, "fulfilled")} className="p-2 hover:bg-muted rounded-lg transition-colors" title="Fulfill">
                          <Package className="w-4 h-4 text-primary" />
                        </button>
                      )}
                      {o.status !== "cancelled" && o.status !== "fulfilled" && (
                        <button onClick={() => updateStatus(o.id, "cancelled")} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors" title="Cancel">
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={6} className="text-center py-8 text-muted-foreground font-body">No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ===================== Categories Tab ===================== */
function CategoriesTab() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("📦");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmoji, setEditEmoji] = useState("");

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    setCategories(data || []);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { error } = await supabase.from("categories").insert({ name: newName.trim(), slug, emoji: newEmoji });
    if (error) toast.error(error.message);
    else { toast.success("Category added"); setNewName(""); setNewEmoji("📦"); fetchCategories(); }
  };

  const handleUpdate = async (id: string) => {
    const slug = editName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const { error } = await supabase.from("categories").update({ name: editName, slug, emoji: editEmoji }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Updated"); setEditingId(null); fetchCategories(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); fetchCategories(); }
  };

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-foreground mb-6">{categories.length} Categories</h2>

      {/* Add new */}
      <div className="flex gap-3 mb-6">
        <input placeholder="Emoji" value={newEmoji} onChange={(e) => setNewEmoji(e.target.value)} className="w-16 px-3 py-2.5 rounded-xl border bg-background font-body text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary" />
        <input placeholder="Category name" value={newName} onChange={(e) => setNewName(e.target.value)} className="flex-1 px-3 py-2.5 rounded-xl border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary" onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <button onClick={handleAdd} disabled={!newName.trim()} className="btn-baby text-sm disabled:opacity-50">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-3 bg-card rounded-xl p-4 border">
            {editingId === c.id ? (
              <>
                <input value={editEmoji} onChange={(e) => setEditEmoji(e.target.value)} className="w-12 px-2 py-1 rounded-lg border bg-background font-body text-sm text-center" />
                <input value={editName} onChange={(e) => setEditName(e.target.value)} className="flex-1 px-2 py-1 rounded-lg border bg-background font-body text-sm" />
                <button onClick={() => handleUpdate(c.id)} className="p-2 hover:bg-muted rounded-lg"><Check className="w-4 h-4 text-primary" /></button>
                <button onClick={() => setEditingId(null)} className="p-2 hover:bg-muted rounded-lg"><X className="w-4 h-4 text-muted-foreground" /></button>
              </>
            ) : (
              <>
                <span className="text-xl">{c.emoji}</span>
                <span className="flex-1 font-body text-sm font-medium text-foreground">{c.name}</span>
                <span className="text-xs text-muted-foreground font-body font-mono">{c.slug}</span>
                <button onClick={() => { setEditingId(c.id); setEditName(c.name); setEditEmoji(c.emoji || "📦"); }} className="p-2 hover:bg-muted rounded-lg">
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>
                <button onClick={() => handleDelete(c.id)} className="p-2 hover:bg-destructive/10 rounded-lg">
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
