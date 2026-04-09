"use client"
import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center sm:text-sm">
        <div className="hidden sm:block w-24"></div> {/* Spacer for centering */}
        <p className="text-center flex-1">
          Diskon musim panas untuk Keyboard dan Mouse hingga 20%{' '}
          <a href="#" className="font-bold underline ml-1">Belanja Sekarang!</a>
        </p>
        <div className="flex items-center gap-2 cursor-pointer">
          <span>Indonesia</span>
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </div>

      {/* Navbar */}
      <header className="border-b bg-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wider">PosKo</h1>
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-black hover:underline underline-offset-4 decoration-2">Beranda</a>
          <a href="#" className="hover:text-black hover:underline underline-offset-4 decoration-2">Tentang</a>
          <a href="#" className="hover:text-black hover:underline underline-offset-4 decoration-2">Katalog</a>
          <a href="#" className="text-black underline underline-offset-4 decoration-2">Kontak</a>
        </nav>
        <div className="flex gap-6 text-xl">
          <button className="hover:text-gray-600"><i className="fa-regular fa-heart"></i></button>
          <button className="hover:text-gray-600"><i className="fa-regular fa-user"></i></button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pb-20">
        {/* Header Section */}
        <section className="text-center py-12 px-4">
          <h2 className="text-3xl font-bold mb-4">Kontak Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan, butuh bantuan, atau ingin bekerja sama dengan PosKo?<br />
            Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda dengan cepat dan ramah.
          </p>
        </section>

        {/* Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mb-16">
          {/* Card 1 */}
          <div className="flex items-start gap-4 p-6 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Alamat Kami</h3>
              <p className="text-gray-600 text-sm">Sidodadi, Kec. Kedaton, Kota<br />Bandar Lampung.</p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="flex items-start gap-4 p-6 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Email</h3>
              <p className="text-gray-600 text-sm">poskocom@gmail.com</p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="flex items-start gap-4 p-6 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl shrink-0">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Jam Operasional</h3>
              <p className="text-gray-600 text-sm">Senin - Jumat : 09:00 - 22:00<br />Sabtu - Minggu : 09:00 - 17:00</p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="w-full h-[400px] bg-gray-200 rounded-xl overflow-hidden relative">
            {/* Menggunakan iframe Google Maps untuk area Bandar Lampung */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127116.65757788484!2d105.17646535560647!3d-5.41674488347895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40da461b24ce27%3A0x103a891783d5bd0!2sBandar%20Lampung%2C%20Bandar%20Lampung%20City%2C%20Lampung!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto px-6">
          <div className="border rounded-2xl p-8 sm:p-12 shadow-sm">
            <h2 className="text-center text-2xl font-bold mb-8">Hubungi Kami</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <input type="text" placeholder="Nama Anda" className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <input type="email" placeholder="Email" className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black" />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <i className="fa-regular fa-pen-to-square"></i>
                </div>
                <input type="text" placeholder="Subjek" className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black" />
              </div>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400">
                  <i className="fa-regular fa-comment-dots"></i>
                </div>
                <textarea rows={6} placeholder="Pesan" className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"></textarea>
              </div>
              <div className="text-center">
                <button type="button" className="px-10 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300 font-medium">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-16 pb-8 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* PosKo Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">PosKo</h2>
            <h3 className="text-lg font-medium mb-4">Berlangganan</h3>
            <p className="text-gray-400 text-sm mb-4">Dapatkan diskon 10%<br />untuk pesanan pertama Anda</p>
            <div className="relative">
              <input type="email" placeholder="Enter your email" className="bg-transparent border border-white rounded py-2 px-3 w-full text-sm focus:outline-none" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <i className="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-medium mb-6">Support</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>Sidodadi, Kec.<br />Kedaton, Kota Bandar<br />Lampung.</li>
              <li>posko@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-medium mb-6">Account</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Akun Saya</a></li>
              <li><a href="#" className="hover:text-white">Login / Register</a></li>
              <li><a href="#" className="hover:text-white">Kartu</a></li>
              <li><a href="#" className="hover:text-white">Daftar Keinginan</a></li>
              <li><a href="#" className="hover:text-white">Belanja</a></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Link</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms Of Use</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="text-lg font-medium mb-6">Download App</h3>
            <p className="text-gray-400 text-xs mb-4">Save $3 with App New User Only</p>
            <div className="flex gap-4 mb-6 items-center">
              {/* QR Code Placeholder */}
              <div className="w-20 h-20 bg-gray-800 border border-gray-600 p-1 rounded">
                 <img src="/api/placeholder/80/80" alt="QR Code" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-black border border-white rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-800">
                  <i className="fa-brands fa-google-play text-xl"></i>
                  <div className="text-left">
                    <div className="text-[8px] leading-none uppercase">Get it on</div>
                    <div className="text-xs font-semibold leading-none">Google Play</div>
                  </div>
                </button>
                <button className="bg-black border border-white rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-800">
                  <i className="fa-brands fa-apple text-xl mb-1"></i>
                  <div className="text-left">
                    <div className="text-[8px] leading-none uppercase">Download on the</div>
                    <div className="text-xs font-semibold leading-none">App Store</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex gap-6 text-xl">
              <a href="#" className="hover:text-gray-400"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-400"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; Copyright PosKo 2026. All right reserved</p>
        </div>

        {/* Scroll to Top Button */}
        <button 
          className="absolute right-6 bottom-6 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </footer>
    </div>
  );
}