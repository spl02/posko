"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Promote from "../components/Promote";
import BackOnTop from "../components/BackOnTop";
import { IconEye, IconHeart, IconSearch, IconStar } from "../components/Icon";

import { supabase } from "../../../utils/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  created_at: string;
  category_id?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const FormatRupiah = ({ value }: { value: number }) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

const SectionHeader = ({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) => (
  <div className="mb-10">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
      <span className="text-[#DB4444] font-semibold text-base">{subtitle}</span>
    </div>

    <h2 className="text-3xl font-semibold tracking-wider text-black">
      {title}
    </h2>
  </div>
);

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
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] p-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300"
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

      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="font-medium text-black text-base line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-[#DB4444] font-medium">
            <FormatRupiah value={Number(product.price)} />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStar key={star} filled={star <= 5} />
            ))}
          </div>

          <span className="text-gray-500 text-sm font-medium">
            ({product.stock} stok)
          </span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
  });
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: categoriesData } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    const { data: settingsData } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    setProducts(productsData || []);
    setCategories(categoriesData || []);
    setSettings(settingsData || null);

    setStats({
      totalProducts: productsData?.length || 0,
      totalCategories: categoriesData?.length || 0,
    });
  };

  const handleTrackService = async () => {
    if (!trackingCode) {
      setTrackingError("Masukkan nomor antrian atau resi");
      return;
    }

    setTrackingLoading(true);
    setTrackingError("");
    setTrackingResult(null);

    const { data, error } = await supabase
      .from("service_orders_view")
      .select(
        `
      *,
      service_statuses (
        name,
        color
      )
    `,
      )
      .or(
        `queue_number.ilike.%${trackingCode}%,receipt_number.ilike.%${trackingCode}%`,
      )
      .maybeSingle();

    if (error || !data) {
      setTrackingError("Data antrian tidak ditemukan");
      setTrackingLoading(false);
      return;
    }

    setTrackingResult(data);
    setTrackingLoading(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Promote />
      <Header />

      <section className="bg-[#F5F5F5] border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] p-3 rounded-lg text-white shadow-lg shadow-red-200">
                <IconSearch className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-lg font-bold leading-tight uppercase tracking-tight">
                  Cek Antrian Servis
                </h2>

                <p className="text-xs text-gray-500 font-medium">
                  Lacak progres perbaikan gadget Anda secara instan
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-2xl relative group">
              <div className="absolute -inset-0.5 bg-[#DB4444] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

              <div className="relative flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    placeholder="Masukkan Nomor Antrian atau Resi"
                    className="flex-1 bg-white border border-gray-300 rounded-lg py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent transition-all shadow-sm"
                  />

                  <button
                    onClick={handleTrackService}
                    disabled={trackingLoading}
                    className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#DB4444] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md disabled:opacity-50"
                  >
                    {trackingLoading ? "MENCARI..." : "LACAK SEKARANG"}
                  </button>
                </div>

                {trackingError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {trackingError}
                  </div>
                )}

                {trackingResult && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Nomor Antrian
                        </p>

                        <h3 className="text-xl font-bold text-black">
                          {trackingResult.queue_number}
                        </h3>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Status Servis
                        </p>

                        <span
                          className="inline-flex px-4 py-2 rounded-full text-sm font-semibold text-white"
                          style={{
                            backgroundColor:
                              trackingResult.service_statuses?.color ||
                              "#DB4444",
                          }}
                        >
                          {trackingResult.service_statuses?.name || "Diproses"}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Estimasi</p>

                        <h3 className="text-base font-semibold text-black">
                          {trackingResult.estimated_finished_at
                            ? new Date(
                                trackingResult.estimated_finished_at,
                              ).toLocaleDateString("id-ID")
                            : "-"}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#F5F5F5] rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">
                          Nama Pelanggan
                        </p>

                        <p className="font-semibold text-black">
                          {trackingResult.customer_name || "-"}
                        </p>
                      </div>

                      <div className="bg-[#F5F5F5] rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Device</p>

                        <p className="font-semibold text-black">
                          {trackingResult.device_name || "-"}
                        </p>
                      </div>

                      <div className="bg-[#F5F5F5] rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Kerusakan</p>

                        <p className="font-semibold text-black">
                          {trackingResult.problem || "-"}
                        </p>
                      </div>

                      <div className="bg-[#F5F5F5] rounded-xl p-4">
                        <p className="text-xs text-gray-500 mb-1">Teknisi</p>

                        <p className="font-semibold text-black">
                          {trackingResult.technician_name || "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="relative overflow-hidden rounded-2xl bg-black min-h-[620px] flex items-center mb-24">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1800&auto=format&fit=crop"
              alt="Gaming Setup"
              className="w-full h-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40"></div>
          </div>

          <div className="absolute top-0 left-0 w-72 h-72 bg-[#DB4444]/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DB4444]/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 w-full px-8 md:px-16 py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-sm text-white font-medium mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#DB4444] animate-pulse"></div>
                Toko Komputer & Sparepart Terlengkap
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] text-white mb-8 tracking-tight">
                Upgrade
                <span className="block text-[#DB4444]">Setup Impianmu</span>
              </h1>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
                Bangun setup gaming dan workstation terbaik dengan pilihan
                laptop, processor, VGA, RAM, SSD, motherboard, casing, dan
                aksesoris premium berkualitas tinggi.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  href="/catalog"
                  className="bg-[#DB4444] hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-2xl shadow-red-500/20 hover:scale-105"
                >
                  Belanja Sekarang
                </Link>

                <Link
                  href="/catalog"
                  className="border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300"
                >
                  Jelajahi Katalog
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                  <h3 className="text-3xl font-black text-white mb-1">
                    {stats.totalProducts}+
                  </h3>

                  <p className="text-sm text-gray-400">Produk Tersedia</p>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                  <h3 className="text-3xl font-black text-white mb-1">24/7</h3>

                  <p className="text-sm text-gray-400">Customer Support</p>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5">
                  <h3 className="text-3xl font-black text-white mb-1">Fast</h3>

                  <p className="text-sm text-gray-400">Pengiriman Cepat</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-200 mb-20" />

        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <SectionHeader subtitle="Produk" title="Produk Terlaris" />

            <Link
              href="/catalog"
              className="bg-[#DB4444] hover:bg-red-600 text-white font-medium py-3 px-10 rounded-sm transition mb-2 shadow-sm"
            >
              Lihat Semua
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <hr className="border-gray-200 mb-20" />

        <section className="my-24 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
            </div>

            <h3 className="font-bold text-lg uppercase mb-2">
              GRATIS ONGKIR CEPAT
            </h3>

            <p className="text-sm text-gray-600">
              Gratis ongkir untuk pesanan di atas Rp 500.000
            </p>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M12 7v6" />
                  <path d="M12 17h.01" />
                </svg>
              </div>
            </div>

            <h3 className="font-bold text-lg uppercase mb-2">
              PELAYANAN PELANGGAN 24/7
            </h3>

            <p className="text-sm text-gray-600">
              Dukungan pelanggan yang ramah 24/7
            </p>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h3 className="font-bold text-lg uppercase mb-2">
              GARANSI UANG KEMBALI
            </h3>

            <p className="text-sm text-gray-600">
              Kami mengembalikan uang Anda dalam 30 hari
            </p>
          </div>
        </section>

        <hr className="border-gray-200 mb-20" />

        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-3xl bg-black text-white min-h-[500px]">
              <div className="absolute inset-0">
                <img
                  src={
                    settings?.banner_url ||
                    settings?.hero_image ||
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt="CTA"
                  className="w-full h-full object-cover opacity-25"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50"></div>
              </div>

              <div className="relative z-10 h-full p-10 md:p-14 flex flex-col justify-between">
                <div>
                  <span className="inline-flex bg-[#DB4444] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6">
                    Official Computer Store
                  </span>

                  <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6">
                    {settings?.cta_title ||
                      "Bangun Setup Gaming & Workstation Terbaik"}
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8">
                    {settings?.cta_description ||
                      "Belanja kebutuhan komputer original dengan garansi resmi, pengiriman cepat, dan support terbaik."}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/catalog"
                      className="bg-[#DB4444] hover:bg-red-600 text-white px-8 py-4 rounded-xl font-bold transition"
                    >
                      Belanja Sekarang
                    </Link>

                    {settings?.whatsapp_number && (
                      <a
                        href={`https://wa.me/${settings.whatsapp_number}`}
                        target="_blank"
                        className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-xl font-bold transition"
                      >
                        Hubungi Admin
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                    <h3 className="text-2xl font-black text-white">
                      {stats.totalProducts}+
                    </h3>

                    <p className="text-sm text-gray-300">Produk</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                    <h3 className="text-2xl font-black text-white">
                      {stats.totalCategories}+
                    </h3>

                    <p className="text-sm text-gray-300">Kategori</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                    <h3 className="text-2xl font-black text-white">24/7</h3>

                    <p className="text-sm text-gray-300">Support</p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                    <h3 className="text-2xl font-black text-white">100%</h3>

                    <p className="text-sm text-gray-300">Original</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-gray-200 bg-white">
              <iframe
                src={
                  settings?.google_maps_embed ||
                  "https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                }
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full min-h-[500px]"
              />

              <div className="p-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold mb-4">
                  {settings?.site_name || "PosKo Computer"}
                </h3>

                <div className="space-y-3 text-gray-600">
                  <p>📍 {settings?.address || "Alamat toko belum diatur"}</p>

                  <p>📧 {settings?.contact_email || "Email belum diatur"}</p>

                  <p>
                    📱{" "}
                    {settings?.whatsapp_number || "Nomor WhatsApp belum diatur"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}
