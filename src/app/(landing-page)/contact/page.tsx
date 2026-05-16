"use client";

import React, { useEffect, useMemo, useState } from "react";

import BackOnTop from "@/app/components/BackOnTop";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Promote from "@/app/components/Promote";

import { createClient } from "../../../../utils/supabase/client";

const supabase = createClient();

interface SiteSettings {
  site_name?: string;
  address?: string;
  contact_email?: string;
  whatsapp_number?: string;
  contact_title?: string;
  contact_description?: string;
  google_maps_embed?: string;
  operational_hours?: string;
  whatsapp_message?: string;
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    setSettings(data);
  };

  const whatsappLink = useMemo(() => {
    const number =
      settings?.whatsapp_number?.replace(/\D/g, "") || "";

    const message = encodeURIComponent(
      settings?.whatsapp_message ||
        "Halo admin, saya ingin bertanya mengenai layanan toko."
    );

    return `https://wa.me/${number}?text=${message}`;
  }, [settings]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Promote />
      <Header />

      <main className="flex-grow">
        {/* HERO */}
        <section className="relative overflow-hidden bg-black text-white">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1800&auto=format&fit=crop"
              alt="Contact Banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-0 left-0 w-72 h-72 bg-[#DB4444]/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DB4444]/10 blur-3xl rounded-full"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <div className="max-w-3xl">
              <span className="inline-flex items-center bg-[#DB4444] px-5 py-2 rounded-full text-sm font-semibold mb-6">
                Contact & Support
              </span>

              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
                {settings?.contact_title || "Hubungi Kami"}
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                {settings?.contact_description ||
                  "Tim kami siap membantu kebutuhan Anda mulai dari konsultasi produk, servis perangkat, hingga informasi pemesanan."}
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebe5d] px-8 py-4 rounded-2xl font-bold transition-all duration-300"
                >
                  Chat WhatsApp
                </a>

                {settings?.contact_email && (
                  <a
                    href={`mailto:${settings.contact_email}`}
                    className="border border-white/20 bg-white/5 hover:bg-white hover:text-black px-8 py-4 rounded-2xl font-bold transition-all duration-300"
                  >
                    Kirim Email
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* INFO CARD */}
        <section className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* ALAMAT */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#DB4444]/10 text-[#DB4444] flex items-center justify-center text-2xl mb-6">
                📍
              </div>

              <h3 className="text-xl font-bold mb-3">
                Alamat Toko
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {settings?.address || "Alamat belum diatur"}
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#DB4444]/10 text-[#DB4444] flex items-center justify-center text-2xl mb-6">
                ✉️
              </div>

              <h3 className="text-xl font-bold mb-3">
                Email
              </h3>

              <p className="text-gray-600 break-all">
                {settings?.contact_email || "Email belum diatur"}
              </p>
            </div>

            {/* JAM */}
            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[#DB4444]/10 text-[#DB4444] flex items-center justify-center text-2xl mb-6">
                🕒
              </div>

              <h3 className="text-xl font-bold mb-3">
                Jam Operasional
              </h3>

              <p className="text-gray-600 whitespace-pre-line">
                {settings?.operational_hours ||
                  "Senin - Minggu : 09:00 - 22:00"}
              </p>
            </div>
          </div>
        </section>

        {/* MAP + CTA */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MAP */}
            <div className="overflow-hidden rounded-3xl border border-gray-200 min-h-[500px] bg-gray-100">
              <iframe
                src={
                  settings?.google_maps_embed ||
                  "https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                }
                width="100%"
                height="100%"
                loading="lazy"
                className="w-full h-full min-h-[500px]"
              />
            </div>

            {/* CTA */}
            <div className="relative overflow-hidden rounded-3xl bg-black text-white p-10 md:p-14">
              <div className="absolute inset-0 opacity-20">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
                  alt="Support"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-flex bg-[#DB4444] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    Customer Support
                  </span>

                  <h2 className="text-4xl font-black leading-tight mb-6">
                    Butuh Bantuan atau Konsultasi?
                  </h2>

                  <p className="text-gray-300 leading-relaxed text-lg mb-8">
                    Hubungi tim {settings?.site_name || "kami"} melalui
                    WhatsApp untuk konsultasi produk, pengecekan stok,
                    informasi servis, dan kebutuhan lainnya.
                  </p>

                  <div className="space-y-5">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                      <p className="text-sm text-gray-400 mb-1">
                        WhatsApp
                      </p>

                      <h3 className="text-xl font-bold">
                        {settings?.whatsapp_number ||
                          "Nomor belum diatur"}
                      </h3>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
                      <p className="text-sm text-gray-400 mb-1">
                        Email
                      </p>

                      <h3 className="text-xl font-bold break-all">
                        {settings?.contact_email ||
                          "Email belum diatur"}
                      </h3>
                    </div>
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-2xl text-center font-bold text-lg transition-all duration-300"
                >
                  Chat Sekarang di WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}