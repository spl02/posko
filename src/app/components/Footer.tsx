import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold tracking-wider mb-2">PosKo</h3>
            <p className="font-medium text-lg">Berlangganan</p>
            <p className="text-sm text-gray-300">
              Dapatkan diskon 10% untuk pesanan pertama Anda
            </p>
            <div className="relative mt-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="bg-transparent border border-white rounded-sm py-2.5 pl-4 pr-12 w-full text-sm focus:outline-none focus:border-[#DB4444] transition"
              />
              <button className="absolute right-3 top-2.5 text-white hover:text-[#DB4444] transition">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">Dukungan</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Jl. Contoh No. 123, Jakarta Selatan, Indonesia.
            </p>
            <p className="text-sm text-gray-300 hover:text-white transition cursor-pointer">
              posko.official@gmail.com
            </p>
            <p className="text-sm text-gray-300 hover:text-white transition cursor-pointer">
              +62 812-3456-7890
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">Akun</h3>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Akun Saya
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Masuk / Daftar
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Keranjang
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Wishlist
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Belanja
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">Tautan Cepat</h3>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Syarat Penggunaan
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Kontak
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold mb-2">Unduh Aplikasi</h3>
            <p className="text-xs text-gray-400 font-medium">
              Hemat Rp 50.000 untuk pengguna baru aplikasi
            </p>
            <div className="flex gap-2 items-center">
              <div className="w-20 h-20 bg-white p-1 rounded-sm">
                <img
                  src="https://placehold.co/100x100/fff/000?text=QR"
                  alt="QR Code"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <img
                  src="https://placehold.co/120x40/000/fff?text=Google+Play"
                  alt="Google Play"
                  className="h-10 cursor-pointer border border-gray-700 rounded-sm hover:opacity-80 transition"
                />
                <img
                  src="https://placehold.co/120x40/000/fff?text=App+Store"
                  alt="App Store"
                  className="h-10 cursor-pointer border border-gray-700 rounded-sm hover:opacity-80 transition"
                />
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#DB4444] transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#DB4444] transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#DB4444] transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#DB4444] transition"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; Copyright PosKo 2026. All right reserved</p>
        </div>
      </div>
    </footer>
  );
}
