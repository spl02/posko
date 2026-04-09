"use client"
import React, { useState, useEffect } from 'react';

// --- Tipe Data (TypeScript) ---
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
}

// --- Data Tiruan Produk (Mock Data) ---
// Membuat 12 produk (3 baris x 4 kolom) berdasarkan referensi gambar
const allProducts: Product[] = [
  { id: '1', name: 'The north coat', price: 260, oldPrice: 360, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Jaket+Merah' },
  { id: '2', name: 'Gucci duffle bag', price: 960, oldPrice: 1160, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Tas+Gucci' },
  { id: '3', name: 'RGB liquid CPU Cooler', price: 160, oldPrice: 170, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=CPU+Cooler' },
  { id: '4', name: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Rak+Buku' },
  
  { id: '5', name: 'HAVIT HV-G92 Gamepad', price: 120, oldPrice: 160, rating: 5, reviews: 88, image: 'https://placehold.co/400x400/f5f5f5/333?text=Gamepad' },
  { id: '6', name: 'AK-900 Wired Keyboard', price: 960, oldPrice: 1160, rating: 4, reviews: 75, image: 'https://placehold.co/400x400/f5f5f5/333?text=Keyboard' },
  { id: '7', name: 'IPS LCD Gaming Monitor', price: 370, oldPrice: 400, rating: 5, reviews: 98, image: 'https://placehold.co/400x400/f5f5f5/333?text=Monitor' },
  { id: '8', name: 'S-Series Comfort Chair', price: 375, oldPrice: 400, rating: 4.5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Kursi+Abu' },

  // Menduplikasi baris kedua untuk melengkapi grid sesuai gambar
  { id: '9', name: 'HAVIT HV-G92 Gamepad', price: 120, oldPrice: 160, rating: 5, reviews: 88, image: 'https://placehold.co/400x400/f5f5f5/333?text=Gamepad' },
  { id: '10', name: 'AK-900 Wired Keyboard', price: 960, oldPrice: 1160, rating: 4, reviews: 75, image: 'https://placehold.co/400x400/f5f5f5/333?text=Keyboard' },
  { id: '11', name: 'IPS LCD Gaming Monitor', price: 370, oldPrice: 400, rating: 5, reviews: 98, image: 'https://placehold.co/400x400/f5f5f5/333?text=Monitor' },
  { id: '12', name: 'S-Series Comfort Chair', price: 375, oldPrice: 400, rating: 4.5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Kursi+Abu' },
];

// --- Komponen Ikon Bantuan ---
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconSearch = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconStar = ({ filled }: { filled?: boolean }) => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FFAD33" : "none"} stroke={filled ? "#FFAD33" : "#bfdbfe"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconEye = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconChevronUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>;

// --- Komponen Produk Card ---
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col group cursor-pointer w-full">
      {/* Container Gambar */}
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] p-4 flex items-center justify-center overflow-hidden">
        
        {/* Ikon Aksi Hover (Heart & Eye) di Kanan Atas */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconHeart /></button>
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconEye /></button>
        </div>

        {/* Gambar Produk */}
        <img src={product.image} alt={product.name} className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300" />

        {/* Tombol Add to Cart (Muncul dari bawah saat Hover) */}
        <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Add To Cart
        </button>
      </div>

      {/* Info Produk */}
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="font-medium text-black text-base line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-3">
          {/* Sesuai desain, menggunakan simbol Dollar $ */}
          <span className="text-[#DB4444] font-medium">${product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-sm">${product.oldPrice}</span>
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


// --- Komponen Utama (Halaman Katalog) ---
export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  // Efek Scroll to Top
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      
      {/* Top Banner Pengumuman */}
      <div className="bg-black text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center relative">
        <p className="text-center w-full md:w-auto">
          Diskon musim panas untuk Keyboard dan Mouse hingga 20% <a href="#" className="font-bold underline ml-2 hover:text-gray-300 transition">Belanja Sekarang!</a>
        </p>
        <div className="absolute right-4 hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-300 transition">
          Indonesia <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      {/* Header / Navigasi */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold tracking-tight">PosKo</h1>
          </div>
          
          <nav className="hidden md:flex gap-8 font-medium text-sm">
            <a href="#" className="text-gray-500 hover:text-black transition">Beranda</a>
            <a href="#" className="text-gray-500 hover:text-black transition">Tentang</a>
            {/* Menu Aktif (Katalog) */}
            <a href="#" className="text-black border-b-2 border-black pb-1">Katalog</a>
            <a href="#" className="text-gray-500 hover:text-black transition">Kontak</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-black hover:text-[#DB4444] transition"><IconHeart /></button>
            <button className="text-black hover:text-[#DB4444] transition"><IconUser /></button>
          </div>
        </div>
      </header>

      {/* Area Konten Utama */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Judul & Pencarian */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Katalog Produk</h2>
          <p className="text-gray-600 text-sm mb-10 text-center">
            Temukan berbagai kebutuhan teknologi dan aksesoris terbaik untuk mendukung aktivitas Anda.
          </p>
          
          {/* Kolom Pencarian */}
          <div className="w-full max-w-3xl relative">
            <input 
              type="text" 
              placeholder="Apa yang Anda cari" 
              className="w-full bg-[#F5F5F5] border-none rounded-md py-3.5 pl-6 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <button className="absolute right-4 top-3 text-gray-500 hover:text-black transition">
              <IconSearch />
            </button>
          </div>
        </div>

        {/* Section Header: All Product */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
            <span className="text-[#DB4444] font-semibold text-base">This Month</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-wider text-black">All Product</h2>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold tracking-wider mb-2">PosKo</h3>
              <p className="font-medium text-lg">Berlangganan</p>
              <p className="text-sm text-gray-300">Dapatkan diskon 10% untuk pesanan pertama Anda</p>
              <div className="relative mt-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent border border-white rounded-sm py-2.5 pl-4 pr-12 w-full text-sm focus:outline-none focus:border-gray-400"
                />
                <button className="absolute right-3 top-2.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-sm text-gray-300 leading-relaxed">Sidodadi, Kec.<br/>Kedaton, Kota Bandar<br/>Lampung.</p>
              <p className="text-sm text-gray-300">posko@gmail.com</p>
              <p className="text-sm text-gray-300">+62815-88888-9999</p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Account</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Akun Saya</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Login / Register</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kartu</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Daftar Keinginan</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Belanja</a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Terms Of Use</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">FAQ</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kontak</a>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Download App</h3>
              <p className="text-xs text-gray-400 font-medium">Save $3 with App New User Only</p>
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
          
          <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm flex justify-center items-center relative">
            <p>&copy; Copyright PosKo 2026. All right reserved</p>
          </div>
        </div>
      </footer>

      {/* Tombol Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 bg-white text-black p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-opacity duration-300 z-50 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <IconChevronUp />
      </button>

    </div>
  );
}