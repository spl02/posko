"use client"
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Promote from '../components/Promote';
import BackOnTop from '../components/BackOnTop';
import { IconChevronLeft, IconChevronRight, IconEye, IconHeart, IconSearch, IconStar } from '../components/Icon';

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
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] p-4 flex items-center justify-center overflow-hidden">
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
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconHeart /></button>
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconEye /></button>
        </div>
        <img src={product.image} alt={product.name} className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300" />
        <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Tambah ke Keranjang
        </button>
      </div>
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
  // State untuk Timer Flash Sale (Real-time)
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
                return prev;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* Top Banner Pengumuman */}
      <Promote />
      {/* Header / Navigasi */}
      <Header />

      {/* FITUR UNGGULAN: PENCARIAN ANTRIAN SERVIS (Tepat di bawah Header) */}
      <section className="bg-[#F5F5F5] border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] p-3 rounded-lg text-white shadow-lg shadow-red-200">
                <IconSearch className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight uppercase tracking-tight">Cek Antrian Servis</h2>
                <p className="text-xs text-gray-500 font-medium">Lacak progres perbaikan gadget Anda secara instan</p>
              </div>
            </div>
            
            <div className="w-full lg:max-w-2xl relative group">
              <div className="absolute -inset-0.5 bg-[#DB4444] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="Masukkan Nomor Antrian atau Resi (Cth: POS-SV-10293)" 
                  className="flex-1 bg-white border border-gray-300 rounded-lg py-3.5 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-[#DB4444] focus:border-transparent transition-all shadow-sm"
                />
                <button className="bg-black text-white px-8 py-3.5 rounded-lg font-bold text-sm hover:bg-[#DB4444] transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md">
                  LACAK SEKARANG
                </button>
              </div>
            </div>
            
            <div className="hidden xl:flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Online</span>
              <span className="border-l border-gray-300 h-4 mx-1"></span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Bagian Hero & Banner */}
        <section className="flex flex-col md:flex-row gap-8 mb-24">
          <aside className="w-full md:w-1/4 pt-4 md:border-r border-gray-200 pr-4">
            <ul className="flex flex-col gap-3 font-medium text-gray-700">
              <li className="flex justify-between items-center cursor-pointer hover:text-[#DB4444]">Komputer <IconChevronRight /></li>
              <li className="flex justify-between items-center cursor-pointer hover:text-[#DB4444]">Laptop <IconChevronRight /></li>
              <li className="cursor-pointer hover:text-[#DB4444]">Keyboard</li>
              <li className="cursor-pointer hover:text-[#DB4444]">Mouse</li>
              <li className="cursor-pointer hover:text-[#DB4444]">Kipas</li>
              <li className="cursor-pointer hover:text-[#DB4444]">Ram</li>
              <li className="cursor-pointer hover:text-[#DB4444]">Stand Laptop</li>
              <li className="cursor-pointer hover:text-[#DB4444]">SSD</li>
              <li className="cursor-pointer hover:text-[#DB4444]">Earphone</li>
            </ul>
          </aside>

          <div className="w-full md:w-3/4 pt-4 md:pl-8">
            <div className="bg-black text-white flex justify-between items-center px-12 py-16 w-full object-cover rounded-sm">
               <div className="flex flex-col gap-4 max-w-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-12 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg')] bg-white bg-contain bg-center bg-no-repeat rounded-full p-2"></div>
                    <span className="text-sm font-medium">iPhone 14 Series</span>
                  </div>
                  <h2 className="text-5xl font-semibold leading-tight">Up to 10%<br/>off Voucher</h2>
                  <a href="#" className="underline underline-offset-8 font-medium mt-2 hover:text-gray-300 flex items-center gap-2">Belanja Sekarang <IconChevronRight/></a>
               </div>
               <div className="hidden md:block">
                  <img src="https://placehold.co/400x300/111/fff?text=Banner+Image" alt="Promo" className="object-contain h-64" />
               </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              <div className="w-3 h-3 rounded-full bg-[#DB4444] border-2 border-white ring-2 ring-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300 cursor-pointer"></div>
            </div>
          </div>
        </section>

        {/* Bagian Flash Sale (Timer Berjalan) */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-12">
              <SectionHeader subtitle="Hari Ini" title="Flash Sales" />
              
              {/* Penghitung Waktu Mundur */}
              <div className="flex items-center gap-4 mb-1 md:mb-0">
                <div className="flex flex-col items-start min-w-[50px]">
                  <span className="text-[10px] font-bold text-black uppercase">Days</span>
                  <span className="text-3xl font-bold tracking-tight">{String(timeLeft.days).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-1">:</span>
                <div className="flex flex-col items-start min-w-[50px]">
                  <span className="text-[10px] font-bold text-black uppercase">Hours</span>
                  <span className="text-3xl font-bold tracking-tight">{String(timeLeft.hours).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-1">:</span>
                <div className="flex flex-col items-start min-w-[50px]">
                  <span className="text-[10px] font-bold text-black uppercase">Minutes</span>
                  <span className="text-3xl font-bold tracking-tight">{String(timeLeft.minutes).padStart(2, '0')}</span>
                </div>
                <span className="text-3xl text-[#DB4444] font-bold pb-1">:</span>
                <div className="flex flex-col items-start min-w-[50px]">
                  <span className="text-[10px] font-bold text-black uppercase">Seconds</span>
                  <span className="text-3xl font-bold tracking-tight text-[#DB4444]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200 transition"><IconChevronLeft /></button>
              <button className="bg-[#F5F5F5] p-3 rounded-full hover:bg-gray-200 transition"><IconChevronRight /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {flashSaleProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-[#DB4444] hover:bg-red-600 text-white font-medium py-4 px-12 rounded-sm transition shadow-lg">
              Lihat Semua Produk
            </button>
          </div>
        </section>

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
              <div key={cat.id} className={`flex flex-col items-center justify-center border rounded-sm h-36 cursor-pointer transition-all duration-300 ${index === 1 ? 'bg-[#DB4444] text-white border-[#DB4444] shadow-md scale-105' : 'border-gray-300 hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]'}`}>
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
            <button className="bg-[#DB4444] hover:bg-red-600 text-white font-medium py-3 px-10 rounded-sm transition mb-2 shadow-sm">
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
        <section className="mb-20 w-full h-[400px] bg-gray-200 rounded-md overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <img src="https://placehold.co/1200x400/e5e7eb/a3a3a3?text=Peta+Lokasi" alt="Peta Lokasi" className="w-full h-full object-cover opacity-80" />
            <div className="absolute bg-white p-4 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-100">
              <div className="bg-[#DB4444] p-3 rounded-full text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p className="font-bold text-base">PosKo Official Store</p>
                <p className="text-xs text-gray-500 font-medium italic underline underline-offset-2">Jl. Contoh No. 123, Jakarta</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
      <BackOnTop />
    </div>
  );
}