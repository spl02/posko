"use client";

import { useState, useRef, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";
import {
  Plus,
  X,
  UploadCloud,
  Package,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
  created_at: string;
}

export const ProductSection = ({
  initialProducts,
}: {
  initialProducts: Product[];
}) => {
  const supabase = createClient();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const resetForm = () => {
    setName("");
    setPrice("");
    setStock("");
    setImageFile(null);

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar!");
      return;
    }

    // VALIDASI SIZE 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar terlalu besar! Maksimal 2MB.");
      return;
    }

    // HAPUS PREVIEW LAMA
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // CREATE PRODUCT
  const handleCreateProduct = async () => {
    // VALIDASI INPUT
    if (!name || !price || !stock) {
      alert("Nama, harga, dan stok wajib diisi!");
      return;
    }

    if (Number(price) <= 0) {
      alert("Harga harus lebih dari 0");
      return;
    }

    if (Number(stock) < 0) {
      alert("Stok tidak valid");
      return;
    }

    setIsSubmitting(true);

    let uploadedImageUrl: string | null = null;

    try {
      // UPLOAD GAMBAR
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        if (!publicUrlData?.publicUrl) {
          throw new Error("Gagal mendapatkan URL gambar");
        }

        uploadedImageUrl = publicUrlData.publicUrl;
      }

      // INSERT DATABASE
      const { data: newProduct, error: insertError } = await supabase
        .from("products")
        .insert({
          name,
          price: Number(price),
          stock: Number(stock),
          image_url: uploadedImageUrl,
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      // UPDATE UI
      if (newProduct) {
        setProducts((prev) => [newProduct, ...prev]);
      }

      // RESET
      resetForm();
      setShowForm(false);
    } catch (error: any) {
      alert(`Gagal menyimpan produk: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(true)}
          className="group flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/20 transition-all duration-300 active:scale-95 text-sm"
        >
          <Plus
            size={18}
            className="transition-transform group-hover:rotate-90"
          />
          Produk Baru
        </button>
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px]">
          <div className="p-5 bg-slate-100/50 rounded-3xl mb-4">
            <Package size={48} className="text-slate-300" strokeWidth={1.5} />
          </div>

          <p className="font-bold text-slate-700 text-lg">Belum ada produk</p>

          <p className="text-sm text-slate-500 mt-1">
            Tambahkan produk pertama Anda untuk mulai berjualan.
          </p>
        </div>
      ) : (
        // GRID PRODUK
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/80 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-100/50">
                    <ImageIcon
                      size={48}
                      className="text-slate-300"
                      strokeWidth={1}
                    />
                  </div>
                )}

                {/* STOCK BADGE */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md shadow-sm border border-white/50 text-xs font-bold text-slate-700">
                  Sisa:{" "}
                  <span
                    className={
                      product.stock < 10 ? "text-red-500" : "text-emerald-500"
                    }
                  >
                    {product.stock}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h2>

                <div className="mt-auto pt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-slate-900">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            {/* CLOSE */}
            <button
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Informasi Produk
            </h2>

            <div className="space-y-5">
              {/* UPLOAD */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block">
                  Foto Produk (Max 2MB)
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-indigo-300 transition-colors cursor-pointer flex flex-col items-center justify-center overflow-hidden relative"
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <UploadCloud size={32} className="text-slate-400 mb-2" />

                      <span className="text-sm font-medium text-slate-500">
                        Klik untuk unggah gambar
                      </span>
                    </>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>

              {/* NAMA */}
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                  Nama Produk
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Kopi Susu Aren"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Harga (Rp)
                  </label>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                    Stok Tersedia
                  </label>

                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateProduct}
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Produk"}
                </button>

                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  disabled={isSubmitting}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all active:scale-95"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
