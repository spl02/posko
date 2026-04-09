import React from 'react';

export default function AccountPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
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
        <nav className="hidden md:flex gap-8 font-medium">
          <a href="#" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Beranda</a>
          <a href="#" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Tentang</a>
          <a href="#" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Katalog</a>
          <a href="#" className="text-gray-700 hover:text-black hover:underline underline-offset-4 decoration-2">Kontak</a>
        </nav>
        <div className="flex gap-6 text-xl items-center">
          <button className="text-gray-700 hover:text-black"><i className="fa-regular fa-heart"></i></button>
          {/* Active User Icon */}
          <button className="bg-[#DB4444] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
            <i className="fa-regular fa-user"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-10 pb-20">
        
        {/* Breadcrumb & Greeting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Beranda</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black font-medium">Akun Saya</span>
          </div>
          <div className="text-sm">
            Selamat Datang, <span className="text-[#DB4444] font-medium">Wilson!</span>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-4">Akun Saya</h3>
              <ul className="space-y-3 pl-4 text-sm">
                <li><a href="#" className="text-[#DB4444] font-medium">Profil</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition">Produk</a></li>
                <li><a href="#" className="text-gray-500 hover:text-black transition">Kategori</a></li>
              </ul>
            </div>
          </aside>

          {/* Form Section */}
          <section className="flex-grow bg-white border border-gray-100 rounded-xl p-6 sm:p-10 shadow-[0_2px_20px_rgb(0,0,0,0.04)]">
            <h2 className="text-xl font-semibold mb-8">Profil</h2>
            
            <form className="space-y-8">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm">First Name</label>
                  <input 
                    type="text" 
                    placeholder="Lorem" 
                    className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Ipsum" 
                    className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Email</label>
                  <input 
                    type="email" 
                    placeholder="123@gmail.com" 
                    className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm">Address</label>
                  <input 
                    type="text" 
                    placeholder="Lorem Ipsum" 
                    className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Password Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-medium">Simpan Kata Sandi</h3>
                <input 
                  type="password" 
                  placeholder="Lorem Ipsum" 
                  className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                />
                <input 
                  type="password" 
                  placeholder="Kata Sandi Baru" 
                  className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                />
                <input 
                  type="password" 
                  placeholder="Konfirmasi Kata Sandi" 
                  className="w-full bg-gray-50 px-4 py-3 rounded-md border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-6 pt-6">
                <button type="button" className="text-gray-600 font-medium hover:text-black transition">
                  Batal
                </button>
                <button type="button" className="bg-[#DB4444] text-white px-8 py-3 rounded-md font-medium hover:bg-red-600 transition">
                  Simpan
                </button>
              </div>
            </form>
          </section>

        </div>
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
                <button className="bg-black border border-white rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-800 transition">
                  <i className="fa-brands fa-google-play text-xl"></i>
                  <div className="text-left">
                    <div className="text-[8px] leading-none uppercase">Get it on</div>
                    <div className="text-xs font-semibold leading-none">Google Play</div>
                  </div>
                </button>
                <button className="bg-black border border-white rounded px-2 py-1 flex items-center gap-2 hover:bg-gray-800 transition">
                  <i className="fa-brands fa-apple text-xl mb-1"></i>
                  <div className="text-left">
                    <div className="text-[8px] leading-none uppercase">Download on the</div>
                    <div className="text-xs font-semibold leading-none">App Store</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex gap-6 text-xl">
              <a href="#" className="hover:text-gray-400 transition"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="hover:text-gray-400 transition"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="hover:text-gray-400 transition"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="hover:text-gray-400 transition"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          <p>© Copyright PosKo 2026. All right reserved</p>
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