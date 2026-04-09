"use client";

import BackOnTop from "@/app/components/BackOnTop";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Promote from "@/app/components/Promote";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Promote />
      <Header />

      {/* Main Content */}
      <main className="flex-grow pb-20">
        {/* Header Section */}
        <section className="text-center py-12 px-4">
          <h2 className="text-3xl font-bold mb-4">Kontak Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Punya pertanyaan, butuh bantuan, atau ingin bekerja sama dengan
            PosKo?
            <br />
            Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda
            dengan cepat dan ramah.
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
              <p className="text-gray-600 text-sm">
                Sidodadi, Kec. Kedaton, Kota
                <br />
                Bandar Lampung.
              </p>
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
              <p className="text-gray-600 text-sm">
                Senin - Jumat : 09:00 - 22:00
                <br />
                Sabtu - Minggu : 09:00 - 17:00
              </p>
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
            <h2 className="text-center text-2xl font-bold mb-8">
              Hubungi Kami
            </h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-regular fa-user"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Nama Anda"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <i className="fa-regular fa-pen-to-square"></i>
                </div>
                <input
                  type="text"
                  placeholder="Subjek"
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gray-400">
                  <i className="fa-regular fa-comment-dots"></i>
                </div>
                <textarea
                  rows={6}
                  placeholder="Pesan"
                  className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-1 focus:ring-black resize-none"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="px-10 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition-colors duration-300 font-medium"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}
