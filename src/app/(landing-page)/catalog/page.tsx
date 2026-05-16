"use client";

import React, { useEffect, useMemo, useState } from "react";
import BackOnTop from "@/app/components/BackOnTop";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import {
  IconEye,
  IconHeart,
  IconSearch,
  IconStar,
} from "@/app/components/Icon";
import Promote from "@/app/components/Promote";

import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  description?: string;
  created_at: string;
}

interface SiteSettings {
  whatsapp_number?: string;
}

const FormatRupiah = ({ value }: { value: number }) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const ProductCard = ({
  product,
  whatsappNumber,
}: {
  product: Product;
  whatsappNumber?: string;
}) => {
  const whatsappLink = useMemo(() => {
    const cleanNumber = whatsappNumber?.replace(/\D/g, "") || "";

    const message = encodeURIComponent(
      `Halo admin, apakah barang *${product.name}* masih tersedia?`,
    );

    return `https://wa.me/${cleanNumber}?text=${message}`;
  }, [product.name, whatsappNumber]);

  return (
    <div className="flex flex-col group cursor-pointer w-full">
      <div className="relative bg-[#F5F5F5] rounded-2xl h-[280px] p-5 flex items-center justify-center overflow-hidden border border-gray-100">
        <img
          src={
            product.image_url ||
            "https://placehold.co/400x400/f5f5f5/333?text=Produk"
          }
          alt={product.name}
          className="object-contain w-4/5 h-4/5 group-hover:scale-105 transition-transform duration-300"
        />

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-0 left-0 w-full bg-[#25D366] text-white py-3 font-semibold opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-center"
        >
          Tanya via WhatsApp
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <h3 className="font-semibold text-black text-base line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-[#DB4444] font-bold text-lg">
            <FormatRupiah value={Number(product.price)} />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStar key={star} filled={star <= 5} />
            ))}
          </div>

          <span className="text-gray-500 text-sm">
            ({product.stock} stok)
          </span>
        </div>
      </div>
    </div>
  );
};

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("whatsapp_number")
      .single();

    setProducts(productsData || []);
    setSettings(settingsData || null);

    setLoading(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      return (
        product.name?.toLowerCase().includes(keyword) ||
        product.description?.toLowerCase().includes(keyword)
      );
    });
  }, [products, search]);

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      <Promote />
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-16">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-full max-w-3xl relative group">
              <div className="absolute -inset-0.5 bg-[#DB4444] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari produk, sparepart, aksesoris..."
                  className="w-full bg-[#F5F5F5] border border-gray-200 rounded-2xl py-4 pl-14 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />

                <div className="absolute left-5 top-4 text-gray-400">
                  <IconSearch />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>

              <span className="text-[#DB4444] font-semibold text-base">
                Semua Produk
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Katalog Toko
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Menampilkan {filteredProducts.length} produk
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-500">
              Memuat produk...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-[#F5F5F5] rounded-3xl py-20 text-center">
              <h3 className="text-2xl font-bold mb-3">
                Produk tidak ditemukan
              </h3>

              <p className="text-gray-500">
                Coba gunakan kata kunci lain
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  whatsappNumber={settings?.whatsapp_number}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}