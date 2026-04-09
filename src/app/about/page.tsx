"use client"
import React, { useState, useEffect } from 'react';

// --- Komponen Ikon ---
const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconChevronUp = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>;

// --- Data Fitur Mengapa Memilih PosKo ---
interface Feature {
  id: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'f1',
    title: 'Produk Lengkap',
    description: 'Semua kebutuhan teknologi Anda tersedia dalam satu tempat',
  },
  {
    id: 'f2',
    title: 'Kualitas Terjamin',
    description: 'Produk yang kami tawarkan telah melalui proses seleksi kualitas',
  },
  {
    id: 'f3',
    title: 'Harga Kompetitif',
    description: 'Kami memberikan harga terbaik sesuai dengan kualitas produk',
  },
  {
    id: 'f4',
    title: 'Pelayanan Terbaik',
    description: 'Tim kami siap membantu Anda dengan respons cepat dan ramah',
  },
  {
    id: 'f5',
    title: 'Pengalaman Berbeda',
    description: 'Belanja teknologi sambil menikmati kopi dalam satu konsep unik',
  },
];

export default function App() {
  const [showScroll, setShowScroll] = useState(false);

  // Fungsi untuk menampilkan tombol scroll to top
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
    <div className="min-h-screen bg-white font-sans text-black flex flex-col relative">
      
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
            {/* Menu Aktif (Tentang) */}
            <a href="#" className="text-black border-b-2 border-black pb-1">Tentang</a>
            <a href="#" className="text-gray-500 hover:text-black transition">Katalog</a>
            <a href="#" className="text-gray-500 hover:text-black transition">Kontak</a>
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-black hover:text-[#DB4444] transition"><IconHeart /></button>
            <button className="text-black hover:text-[#DB4444] transition"><IconUser /></button>
          </div>
        </div>
      </header>

      {/* Konten Utama */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        
        {/* Section 1: Tentang PosKo */}
        <section className="w-full text-center mb-20">
          <h2 className="text-2xl font-bold mb-8">Tentang PosKo</h2>
          <div className="border-t border-gray-200 w-full mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-[15px]">
            PosKo adalah sebuah instansi yang bergerak di bidang teknologi dan kebutuhan digital modern, yang berfokus
            pada penyediaan berbagai produk berkualitas untuk menunjang aktivitas kerja, belajar, dan hiburan Anda.
            Kami hadir sebagai solusi lengkap bagi kebutuhan perangkat komputer dan aksesoris, mulai dari sparepart
            komputer, laptop, mouse, keyboard, printer, hingga aksesoris seperti stand laptop & HP serta headphone. Tidak
            hanya itu, PosKo juga menghadirkan produk kopi pilihan, untuk menemani produktivitas Anda sehari-hari.
          </p>
        </section>

        {/* Section 2: Visi dan Misi */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Visi */}
          <div className="text-center md:pr-10">
            <h3 className="text-xl font-bold mb-6">Visi</h3>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Menjadi penyedia produk teknologi dan
              aksesoris terpercaya yang mampu
              memenuhi kebutuhan masyarakat
              dengan kualitas terbaik dan pelayanan
              maksimal.
            </p>
          </div>
          
          {/* Garis Pemisah Vertikal (Desktop) / Horizontal (Mobile) */}
          <div className="hidden md:block w-px bg-gray-200 absolute left-1/2 transform -translate-x-1/2 h-48 mt-2"></div>
          <div className="md:hidden w-full h-px bg-gray-200 my-2"></div>

          {/* Misi */}
          <div className="md:pl-10 text-center md:text-left">
            <h3 className="text-xl font-bold mb-6">Misi</h3>
            <ul className="text-gray-700 leading-relaxed space-y-2 list-disc list-outside ml-5 text-[15px] text-left">
              <li>Menyediakan produk teknologi yang berkualitas dan terpercaya</li>
              <li>Memberikan harga yang kompetitif dan terjangkau</li>
              <li>Menghadirkan pelayanan yang cepat, ramah, dan profesional</li>
              <li>Mengikuti perkembangan teknologi untuk memenuhi kebutuhan pelanggan</li>
              <li>Memberikan pengalaman belanja yang nyaman dan praktis</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Mengapa Memilih PosKo */}
        <section className="w-full text-center mb-24">
          <div className="border-t border-gray-200 w-full mb-10"></div>
          <h2 className="text-2xl font-bold mb-12">Mengapa Memilih PosKo</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center">
                {/* Lingkaran Hitam Placeholder (Sesuai Desain) */}
                <div className="w-16 h-16 bg-black rounded-full mb-6 shadow-sm flex items-center justify-center">
                  {/* Bisa ditambahkan ikon SVG di dalam sini jika ingin tidak sekadar lingkaran hitam */}
                  <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                </div>
                <h4 className="font-bold text-sm mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed max-w-[180px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Komitmen Kami */}
        <section className="w-full text-center mb-10">
          <div className="border-t border-gray-200 w-full mb-10"></div>
          <h2 className="text-2xl font-bold mb-8">Komitmen Kami</h2>
          <div className="border-b border-gray-200 w-full mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-[15px]">
            PosKo berkomitmen untuk terus berkembang dan menjadi mitra terpercaya bagi pelanggan dalam memenuhi
            kebutuhan teknologi sehari-hari. Kami percaya bahwa teknologi yang tepat dapat meningkatkan produktivitas dan
            kualitas hidup.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-6 mt-auto">
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
                  placeholder="Enter your email" 
                  className="bg-transparent border border-white rounded-sm py-2.5 pl-4 pr-12 w-full text-sm focus:outline-none focus:border-gray-400"
                />
                <button className="absolute right-3 top-2.5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Support</h3>
              <p className="text-sm text-gray-300 leading-relaxed">Sidodadi, Kec.<br/>Kedaton, Kota Bandar<br/>Lampung.</p>
              <p className="text-sm text-gray-300">posko@gmail.com</p>
              <p className="text-sm text-gray-300">+62815-88888-9999</p>
            </div>

            {/* Kolom 3 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Account</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Akun Saya</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Login / Register</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kartu</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Daftar Keinginan</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Belanja</a>
            </div>

            {/* Kolom 4 */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold mb-2">Quick Link</h3>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Terms Of Use</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">FAQ</a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">Kontak</a>
            </div>

            {/* Kolom 5 */}
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