import { ProductSection } from "../components/ProductSection"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Katalog Produk</h1>
          <p className="text-slate-500 text-sm">Kelola stok, harga, dan informasi produk Anda di sini.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
          <span>+ Produk Baru</span>
        </button>
      </div>

      <ProductSection />
    </div>
  )
}