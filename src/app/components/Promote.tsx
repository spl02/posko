import React from "react";

export default function Promote() {
  return (
    <div className="bg-black text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center relative">
      <p className="text-center w-full md:w-auto">
        Penawaran Musim Panas Untuk Semua Pakaian Renang Dan Pengiriman Ekspres
        Gratis - Diskon 50%!{" "}
        <a href="#" className="font-bold underline ml-2">
          Beli Sekarang
        </a>
      </p>
      <div className="absolute right-4 hidden md:flex items-center gap-1 cursor-pointer">
        English{" "}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
