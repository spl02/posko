'use client'
import { useEffect, useState } from 'react'
import { createClient } from '../../../../utils/supabase/client'
import { Package, Edit3, Trash2, Search, Filter } from 'lucide-react'

export const ProductSection = () => {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg border w-full md:w-80">
          <Search size={18} className="text-gray-400" />
          <input className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-full outline-none" placeholder="Cari nama produk..." />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 border rounded-lg hover:bg-gray-50 transition-all">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Produk</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Kategori</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Harga</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Stok</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="p-10 text-center animate-pulse text-gray-400">Memuat produk...</td></tr>
            ) : products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                      <Package size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-500 truncate w-40">{item.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
                    {item.category || 'Uncategorized'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">
                  Rp {item.price.toLocaleString('id-ID')}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${item.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                    {item.stock} unit
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                  <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && products.length === 0 && (
          <div className="p-10 text-center text-gray-400">Belum ada produk.</div>
        )}
      </div>
    </div>
  )
}