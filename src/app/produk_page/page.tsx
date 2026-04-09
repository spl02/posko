"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserCircle,
  faPlus,
  faEllipsis,
  faPaperPlane,
  faArrowUp,
  faChevronDown,
  faXmark,
  faPenToSquare,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function ProductPageAction() {
  // State untuk mengontrol buka/tutup menu aksi
  // Diset true secara default agar sesuai dengan tampilan gambar Anda
  const [isActionOpen, setIsActionOpen] = useState(true);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-3 px-8 md:px-16 flex justify-between items-center z-20">
        <div className="hidden md:block w-24"></div> {/* Spacer */}
        <div className="flex-1 text-center">
          Diskon musim panas untuk Keyboard dan Mouse hingga 20%{" "}
          <span className="font-bold underline cursor-pointer ml-2 hover:text-gray-300">
            Belanja Sekarang!
          </span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer w-24 justify-end">
          <span>Indonesia</span>
          <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-b py-5 px-8 md:px-16 flex justify-between items-center z-20 bg-white">
        <h1 className="text-2xl font-bold tracking-wide">PosKo</h1>
        <div className="hidden md:flex gap-12 text-sm font-medium">
          <a href="#" className="hover:text-gray-500 transition-colors">Beranda</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Tentang</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Katalog</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Kontak</a>
        </div>
        <div className="flex gap-6 items-center">
          <FontAwesomeIcon icon={faHeart} className="w-5 h-5 cursor-pointer hover:text-gray-500" />
          <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6 text-red-500 cursor-pointer" />
        </div>
      </nav>

      {/* Breadcrumb & Welcome message */}
      <div className="px-8 md:px-16 py-10 flex justify-between items-center text-sm z-10">
        <div className="text-gray-500">
          Beranda <span className="mx-2">/</span> <span className="text-black font-medium">Akun Saya</span>
        </div>
        <div>
          Selamat Datang, <span className="text-red-500 font-medium">Wilson!</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="px-8 md:px-16 pb-24 flex flex-col md:flex-row gap-8 md:gap-16 flex-1 z-10">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-48 flex-shrink-0">
          <h2 className="font-bold text-base mb-4">Akun Saya</h2>
          <ul className="space-y-3 text-sm ml-4">
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors">Profil</li>
            <li className="text-red-500 font-medium cursor-pointer">Produk</li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors">Kategori</li>
          </ul>
        </aside>

        {/* Product Table Container */}
        <section className="flex-1">
          <div className="shadow-sm border border-gray-100 rounded-md p-8 min-h-[400px]">
            <h2 className="text-xl font-bold mb-6">Produk</h2>
            
            <div className="overflow-visible"> {/* Mengubah overflow-x-auto menjadi visible agar dropdown tidak terpotong */}
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#f8f8f8]">
                  <tr>
                    <th className="py-4 px-6 font-medium rounded-l-md">No</th>
                    <th className="py-4 px-6 font-medium">Nama Produk</th>
                    <th className="py-4 px-6 font-medium">Kategori</th>
                    <th className="py-4 px-6 font-medium">Harga</th>
                    <th className="py-4 px-6 font-medium">Stok</th>
                    <th className="py-4 px-6 font-medium text-center w-24 rounded-r-md">
                      <button className="text-black hover:text-gray-600">
                        <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6">1</td>
                    <td className="py-5 px-6">Laptop Stand</td>
                    <td className="py-5 px-6">Laptop</td>
                    <td className="py-5 px-6">100K</td>
                    <td className="py-5 px-6">10</td>
                    <td className="py-2 px-6 text-center relative align-top pt-5">
                      {/* Tombol Toggle Aksi */}
                      <button 
                        onClick={() => setIsActionOpen(!isActionOpen)}
                        className="text-black hover:text-gray-600 w-8 h-8 flex items-center justify-center mx-auto"
                      >
                        <FontAwesomeIcon 
                          icon={isActionOpen ? faXmark : faEllipsis} 
                          className="w-4 h-4" 
                        />
                      </button>

                      {/* Dropdown Menu Aksi */}
                      {isActionOpen && (
                        <div className="absolute right-4 top-[50px] bg-[#e6e6e6] shadow-md z-50 w-28 flex flex-col rounded-sm overflow-hidden">
                          <button className="flex items-center gap-3 px-4 py-2.5 text-xs text-black hover:bg-gray-300 transition-colors text-left w-full">
                            <FontAwesomeIcon icon={faPenToSquare} className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button className="flex items-center gap-3 px-4 py-2.5 text-xs text-black hover:bg-gray-300 transition-colors text-left w-full">
                            <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-6 px-8 md:px-16 mt-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-2">PosKo</h2>
            <h3 className="font-semibold text-lg">Berlanggan</h3>
            <p className="text-sm text-gray-300">Dapatkan diskon 10%<br/>untuk pesanan pertama Anda</p>
            <div className="relative mt-2 border border-white rounded flex items-center p-2 w-full max-w-[250px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none text-sm w-full pr-8 text-white placeholder-gray-400"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
                <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Support</h3>
            <p className="text-sm text-gray-300 leading-relaxed max-w-[200px]">
              Sidodadi, Kec.<br/>Kedaton, Kota Bandar<br/>Lampung.
            </p>
            <p className="text-sm text-gray-300 mt-2">posko@gmail.com</p>
            <p className="text-sm text-gray-300 mt-1">+88015-88888-9999</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Account</h3>
            <ul className="text-sm text-gray-300 space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Akun Saya</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Login / Register</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kartu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daftar Keinginan</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belanja</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Quick Link</h3>
            <ul className="text-sm text-gray-300 space-y-3">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-2">Download App</h3>
            <p className="text-xs text-gray-400">Save $3 with App New User Only</p>
            <div className="flex gap-3 items-center">
              <div className="bg-white p-1 rounded-sm w-[80px] h-[80px] flex items-center justify-center text-black text-xs">
                QR Code
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-transparent border border-white rounded-md px-2 py-1 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="text-left">
                    <div className="text-[8px] uppercase">Get it on</div>
                    <div className="text-xs font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="bg-transparent border border-white rounded-md px-2 py-1 flex items-center gap-2 hover:bg-white/10 transition-colors">
                  <div className="text-left">
                    <div className="text-[8px] uppercase">Download on the</div>
                    <div className="text-xs font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="flex gap-6 mt-6">
              <a href="#" className="text-white hover:text-gray-400 transition-colors"><FontAwesomeIcon icon={faFacebookF} className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors"><FontAwesomeIcon icon={faTwitter} className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors"><FontAwesomeIcon icon={faInstagram} className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-gray-400 transition-colors"><FontAwesomeIcon icon={faLinkedinIn} className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-center items-center relative">
          <p className="text-gray-500 text-sm">
            &copy; Copyright PosKo 2026. All right reserved
          </p>
          <button 
            className="absolute right-0 bottom-0 bg-[#f5f5f5] text-black w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors shadow-lg"
            aria-label="Scroll to top"
          >
            <FontAwesomeIcon icon={faArrowUp} className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}