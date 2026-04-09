"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserCircle,
  faPaperPlane,
  faArrowUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function EditCategoryPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-3 px-8 md:px-16 flex justify-between items-center">
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
      <nav className="border-b py-5 px-8 md:px-16 flex justify-between items-center">
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
      <div className="px-8 md:px-16 py-10 flex justify-between items-center text-sm">
        <div className="text-gray-500">
          Beranda <span className="mx-2">/</span> <span className="text-black font-medium">Akun Saya</span>
        </div>
        <div>
          Selamat Datang, <span className="text-red-500 font-medium">Wilson!</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="px-8 md:px-16 pb-24 flex flex-col md:flex-row gap-8 md:gap-16 flex-1">
        {/* Sidebar Menu */}
        <aside className="w-full md:w-48 flex-shrink-0">
          <h2 className="font-bold text-base mb-4">Akun Saya</h2>
          <ul className="space-y-3 text-sm ml-4">
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors">Profil</li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors">Produk</li>
            {/* Menu Kategori yang aktif */}
            <li className="text-red-500 font-medium cursor-pointer">Kategori</li>
          </ul>
        </aside>

        {/* Form Container */}
        <section className="flex-1 max-w-4xl">
          {/* Section Breadcrumb */}
          <h2 className="text-lg mb-6">
            <span className="text-gray-500">Kategori</span>{" "}
            <span className="mx-2 text-gray-400">/</span>{" "}
            <span className="font-bold text-black">Edit Kategori</span>
          </h2>
          
          {/* Gray Form Box */}
          <div className="bg-[#f8f8f8] rounded-md p-8 md:p-12">
            <div className="space-y-6">
              {/* Row: Nama Kategori */}
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium">Nama Kategori</label>
                <span className="text-sm font-medium">:</span>
                <input 
                  type="text" 
                  defaultValue="Keyboard"
                  className="flex-1 max-w-[400px] bg-transparent outline-none text-sm text-gray-800"
                />
              </div>

              {/* Row: Deskripsi */}
              <div className="flex items-start gap-4 pt-1">
                <label className="w-32 text-sm font-medium">Deskripsi</label>
                <span className="text-sm font-medium">:</span>
                <textarea 
                  rows={2}
                  defaultValue="Perangkat input untuk mengetik Digunakan untuk komputer dan laptop"
                  className="flex-1 max-w-[500px] bg-transparent outline-none text-sm text-gray-800 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-6 mt-8">
            <button className="text-black font-medium hover:text-gray-600 transition-colors px-4 py-2">
              Batal
            </button>
            <button className="bg-[#db4444] hover:bg-red-600 transition-colors text-white font-medium py-3 px-10 rounded-md">
              Simpan
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-6 px-8 md:px-16 mt-auto">
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