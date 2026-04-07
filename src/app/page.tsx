"use client"
import React, { useState, useEffect } from 'react';

// --- Tipe Data (TypeScript) ---
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// --- Data Tiruan (Mock Data) ---
const flashSaleProducts: Product[] = [
  { id: '1', name: 'HAVIT HV-G92 Gamepad', price: 120000, oldPrice: 160000, discount: 40, rating: 5, reviews: 88, image: 'https://placehold.co/400x400/f5f5f5/333?text=Gamepad' },
  { id: '2', name: 'AK-900 Wired Keyboard', price: 960000, oldPrice: 1160000, discount: 35, rating: 4, reviews: 75, image: 'https://placehold.co/400x400/f5f5f5/333?text=Keyboard' },
  { id: '3', name: 'IPS LCD Gaming Monitor', price: 3700000, oldPrice: 4000000, discount: 30, rating: 5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Monitor' },
  { id: '4', name: 'S-Series Comfort Chair ', price: 375000, oldPrice: 400000, discount: 25, rating: 4.5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Kursi' },
];

const bestSellingProducts: Product[] = [
  { id: '5', name: 'The north coat', price: 2600000, oldPrice: 3600000, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Jaket' },
  { id: '6', name: 'Gucci duffle bag', price: 960000, oldPrice: 1160000, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Tas' },
  { id: '7', name: 'RGB liquid CPU Cooler', price: 160000, oldPrice: 170000, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Cooler' },
  { id: '8', name: 'Small BookSelf', price: 360000, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Rak+Buku' },
];

// --- Komponen Ikon Bantuan (Menyerupai FontAwesome) ---
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconStar = ({ filled }: { filled?: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FFAD33" : "none"} stroke={filled ? "#FFAD33" : "#bfdbfe"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>;
const IconChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>;

// Ikon Kategori
const categories: Category[] = [
  { id: 'c1', name: 'Phones', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg> },
  { id: 'c2', name: 'Computers', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> },
  { id: 'c3', name: 'SmartWatch', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="12" height="12" x="6" y="6" rx="3"/><path d="M16 2v4M8 2v4M16 18v4M8 18v4"/></svg> },
  { id: 'c4', name: 'Camera', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg> },
  { id: 'c5', name: 'HeadPhones', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg> },
  { id: 'c6', name: 'Gaming', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4m10-2h.01M16 12h.01"/></svg> },
];

// --- Komponen Pembantu ---

const FormatRupiah = ({ value }: { value: number }) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const SectionHeader = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="mb-10">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
      <span className="text-[#DB4444] font-semibold text-base">{subtitle}</span>
    </div>
    <h2 className="text-3xl font-semibold tracking-wider text-black">{title}</h2>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col group cursor-pointer w-full">
      {/* Container Gambar */}
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] p-4 flex items-center justify-center overflow-hidden">
        {/* Badge Diskon/Baru */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded-sm z-10">
            -{product.discount}%
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-3 py-1 rounded-sm z-10">
            NEW
          </div>
        )}

        {/* Ikon Aksi Hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconHeart /></button>
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconEye /></button>
        </div>

        {/* Gambar Produk */}
        <img src={product.image} alt={product.name} className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300" />

        {/* Tombol Add to Cart (Hover) */}
        <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Tambah ke Keranjang
        </button>
      </div>

      {/* Info Produk */}
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="font-medium text-black text-base line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-3">
          <span className="text-[#DB4444] font-medium"><FormatRupiah value={product.price} /></span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-sm"><FormatRupiah value={product.oldPrice} /></span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStar key={star} filled={star <= Math.floor(product.rating)} />
            ))}
          </div>
          <span className="text-gray-500 text-sm font-medium">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};


// --- Komponen Utama (Halaman) ---
export default function App() {
  // Simulasi Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Banner Pengumuman */}
      <div className="bg-black text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center relative">
        <p className="text-center w-full md:w-auto">
          Penawaran Musim Panas Untuk Semua Pakaian Renang Dan Pengiriman Ekspres Gratis - Diskon 50%! <a href="#" className="font-bold underline ml-2">Beli Sekarang</a>
        </p>
        <div className="absolute right-4 hidden md:flex items-center gap-1 cursor-pointer">
          English <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      {/* Header / Navigasi */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">PosKo</h1>
          </div>
          
          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:underline underline-offset-4">Beranda</a>
            <a href="#" className="hover:underline underline-offset-4">Kontak</a>
            <a href="#" className="hover:underline underline-offset-4">Tentang</a>
            <a href="#" className="hover:underline underline-offset-4">Daftar</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Apa yang Anda cari?" 
                className="bg-[#F5F5F5] rounded-md py-2 pl-4 pr-10 text-sm w-60 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <div className="absolute right-3 top-2.5 text-gray-500">
                <IconSearch />
              </div>
            </div>
            <button className="text-black hover:text-[#DB4444] transition"><IconHeart /></button>
            <button className="text-black hover:text-[#DB4444] transition"><IconUser /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Bagian Hero (Menu Samping & Banner) */}
        <section className="flex flex-col md:flex-row gap-8 mb-24">
          {/* Menu Kategori Samping */}
          <aside className="w-full md:w-1/4 pt-4 md:border-r border-gray-200 pr-4">
            <ul className="flex flex-col gap-3 font-medium text-gray-700">
              <li className="flex justify-between items-center cursor-pointer hover:text-black">Woman's Fashion <IconChevronRight /></li>
              <li className="flex justify-between items-center cursor-pointer hover:text-black">Men's Fashion <IconChevronRight /></li>
              <li className="cursor-pointer hover:text-black">Electronics</li>
              <li className="cursor-pointer hover:text-black">Home & Lifestyle</li>
              <li className="cursor-pointer hover:text-black">Medicine</li>
              <li className="cursor-pointer hover:text-black">Sports & Outdoor</li>
              <li className="cursor-pointer hover:text-black">Baby's & Toys</li>
              <li className="cursor-pointer hover:text-black">Groceries & Pets</li>
              <li className="cursor-pointer hover:text-black">Health & Beauty</li>
            </ul>
          </aside>

          {/* Banner Utama */}
          <div className="w-full md:w-3/4 pt-4 md:pl-8">
            <div className="bg-black text-white flex justify-between items-center px-12 py-16 w-full object-cover">
               <div className="flex flex-col gap-4 max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg')] bg-white bg-contain bg-center bg-no-repeat rounded-full p-2"></div>
                    <span className="text-sm">iPhone 14 Series</span>
                  </div>
                  <h2 className="text-5xl font-semibold leading-tight">Up to 10%<br/>off Voucher</h2>
                  <a href="#" className="underline underline-offset-8 font-medium mt-2 hover:text-gray-300 flex items-center gap-2">Belanja Sekarang <IconChevronRight/></a>
               </div>
               <div className="hidden md:block">
                  {/* Placeholder untuk gambar produk besar di banner */}
                  <img src="https://placehold.co/400x300/111/fff?text=Banner+Image" alt="Promo" className="object-contain h-64" />
               </div>
            </div>
            {/* Indikator Slider (Dummy) */}
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-3 h-3 rounded-full bg-[#DB4444] border-2 border-white ring-2 ring-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
            </div>
          </div>
        </section>

        {/* Bagian Flash Sale */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-12">
              <SectionHeader subtitle="Hari Ini" title="Flash Sales" />
              
              {/* Penghitung Waktu Mundur */}
              <div className="flex items-center gap-4 mb-1 md:mb-0">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-black">Days</span>
                  <span className="text-3xl font-bold tracking-widest">{String(timeLeft.days).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-black">Hours</span>
                  <span className="text-3xl font-bold tracking-widest">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-black">Minutes</span>
                  <span className="text-3xl font-bold tracking-widest">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-2">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs font-medium text-black">Seconds</span>
                  <span className="text-3xl font-bold tracking-widest">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            {/* Navigasi Kanan/Kiri */}
            <div className="flex gap-2">
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200"><IconChevronLeft /></button>
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200"><IconChevronRight /></button>
            </div>
          </div>

          {/* Grid Produk Flash Sale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-[#DB4444] hover:bg-red-600 text-white font-medium py-4 px-12 rounded-sm transition">
              Lihat Semua Produk
            </button>
          </div>
        </section>

        {/* Garis Pemisah */}
        <hr className="border-gray-200 mb-20" />

        {/* Bagian Kategori */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <SectionHeader subtitle="Kategori" title="Cari Berdasarkan Kategori" />
            <div className="flex gap-2 mb-2">
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200"><IconChevronLeft /></button>
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200"><IconChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, index) => (
              <div key={cat.id} className={`flex flex-col items-center justify-center border rounded-sm h-36 cursor-pointer transition-colors duration-300 ${index === 1 ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'border-gray-300 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]'}`}>
                <div className="mb-4">{cat.icon}</div>
                <span className="font-medium text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-gray-200 mb-20" />

        {/* Bagian Produk Terlaris */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <SectionHeader subtitle="Bulan Ini" title="Produk Terlaris" />
            <button className="bg-[#DB4444] hover:bg-red-600 text-white font-medium py-3 px-10 rounded-sm transition mb-2">
              Lihat Semua
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellingProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Bagian Layanan Kami */}
        <section className="my-24 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
              </div>
            </div>
            <h3 className="font-bold text-lg uppercase mb-2">GRATIS ONGKIR CEPAT</h3>
            <p className="text-sm text-gray-600">Gratis ongkir untuk pesanan di atas Rp 500.000</p>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v6"/><path d="M12 17h.01"/></svg>
              </div>
            </div>
            <h3 className="font-bold text-lg uppercase mb-2">PELAYANAN PELANGGAN 24/7</h3>
            <p className="text-sm text-gray-600">Dukungan pelanggan yang ramah 24/7</p>
          </div>

          <div className="flex flex-col items-center text-center max-w-xs">
            <div className="bg-gray-300 p-2.5 rounded-full mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
            <h3 className="font-bold text-lg uppercase mb-2">GARANSI UANG KEMBALI</h3>
            <p className="text-sm text-gray-600">Kami mengembalikan uang Anda dalam 30 hari</p>
          </div>
        </section>

        {/* Bagian Peta */}
        <section className="mb-20 w-full h-[400px] bg-gray-200 rounded-md overflow-hidden relative">
          {/* Ini adalah placeholder untuk Google Maps */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <img src="https://placehold.co/1200x400/e5e7eb/a3a3a3?text=Peta+Lokasi" alt="Peta Lokasi" className="w-full h-full object-cover opacity-80" />
            <div className="absolute bg-white p-4 rounded shadow-lg flex items-center gap-3">
              <div className="bg-yellow-400 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="font-bold text-sm">PosKo Official Store</p>
                <p className="text-xs text-gray-500">Jl. Contoh No. 123, Jakarta</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            
            {/* Kolom 1 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold tracking-wider mb-2">PosKo</h3>
              <p className="font-medium text-lg">Berlangganan</p>
              <p className="text-sm text-gray-300">Dapatkan diskon 10% untuk pesanan pertama Anda</p>
              <div className="relative mt-2">
                <input 
                  type="email" 
                  placeholder="Masukkan email Anda" 
                  className="bg-transparent border border-white rounded-sm py-2.5 pl-4 pr-12 w-full text-sm focus:outline-none focus:border-gray-400"
                />
                <button className="absolute right-3 top-2.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Dukungan</h3>
              <p className="text-sm text-gray-300 leading-relaxed">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
              <p className="text-sm text-gray-300">exclusive@gmail.com</p>
              <p className="text-sm text-gray-300">+88015-88888-9999</p>
            </div>

            {/* Kolom 3 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Akun</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Akun Saya</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Masuk / Daftar</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Keranjang</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Wishlist</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Belanja</a>
            </div>

            {/* Kolom 4 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Tautan Cepat</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kebijakan Privasi</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Syarat Penggunaan</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">FAQ</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kontak</a>
            </div>

            {/* Kolom 5 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Unduh Aplikasi</h3>
              <p className="text-xs text-gray-400 font-medium">Hemat $3 untuk pengguna baru aplikasi</p>
              <div className="flex gap-2 items-center">
                <div className="w-20 h-20 bg-white p-1 rounded-sm">
                  <img src="https://placehold.co/100x100/fff/000?text=QR" alt="QR Code" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  <img src="https://placehold.co/120x40/000/fff?text=Google+Play" alt="Google Play" className="h-10 cursor-pointer border border-gray-700 rounded-sm" />
                  <img src="https://placehold.co/120x40/000/fff?text=App+Store" alt="App Store" className="h-10 cursor-pointer border border-gray-700 rounded-sm" />
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <a href="#" className="text-gray-300 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="#" className="text-gray-300 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                <a href="#" className="text-gray-300 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
                <a href="#" className="text-gray-300 hover:text-white"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; Copyright PosKo 2026. All right reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}