"use client";

import { useEffect, useState } from "react";
import BackOnTop from "@/app/components/BackOnTop";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Promote from "@/app/components/Promote";
import { createClient } from "../../../../utils/supabase/client";

interface AboutSettings {
  id: string;
  company_name: string | null;
  about_description: string | null;
  vision: string | null;
  mission_1: string | null;
  mission_2: string | null;
  mission_3: string | null;
  mission_4: string | null;
  mission_5: string | null;
  commitment_text: string | null;
}

export default function AboutPage() {
  const supabase = createClient();

  const [about, setAbout] = useState<AboutSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    setLoading(true);

    const { data } = await supabase
      .from("about_settings")
      .select("*")
      .single();

    setAbout(data || null);

    setLoading(false);
  };

  const missions = [
    about?.mission_1,
    about?.mission_2,
    about?.mission_3,
    about?.mission_4,
    about?.mission_5,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      <Promote />
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-32 text-gray-500">
            Memuat data...
          </div>
        ) : (
          <>
            {/* HERO */}
            <section className="mb-20">
              <div className="flex flex-col items-center text-center">
                <div className="w-full max-w-4xl relative group">
                  <div className="absolute -inset-0.5 bg-[#DB4444] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

                  <div className="relative bg-[#F5F5F5] border border-gray-200 rounded-3xl px-8 py-16">
                    <span className="text-[#DB4444] font-semibold text-sm uppercase tracking-wider">
                      About Company
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold mt-5 leading-tight">
                      Tentang {about?.company_name}
                    </h1>

                    <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                      {about?.about_description}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* VISION & MISSION */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>

                <span className="text-[#DB4444] font-semibold text-base">
                  Company Values
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight mb-10">
                Visi & Misi
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Vision */}
                <div className="bg-[#F5F5F5] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all">

                  <h3 className="text-2xl font-bold mb-5">Visi</h3>

                  <p className="text-gray-600 leading-relaxed">
                    {about?.vision}
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-[#F5F5F5] border border-gray-100 rounded-3xl p-8 hover:shadow-md transition-all">

                  <h3 className="text-2xl font-bold mb-5">Misi</h3>

                  <ul className="space-y-4">
                    {missions.map((mission, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-4 text-gray-600"
                      >
                        <div className="min-w-[32px] h-8 rounded-full bg-[#DB4444] text-white flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>

                        <span className="leading-relaxed text-sm md:text-base">
                          {mission}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* WHY US */}
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>

                <span className="text-[#DB4444] font-semibold text-base">
                  Why Choose Us
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight mb-3">
                Mengapa Memilih {about?.company_name}
              </h2>

              <p className="text-gray-500 text-sm mb-12">
                Kami memberikan pengalaman terbaik untuk setiap pelanggan
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  {
                    title: "Produk Lengkap",
                    desc: "Semua kebutuhan tersedia dalam satu tempat",
                  },
                  {
                    title: "Kualitas Terbaik",
                    desc: "Produk sudah melalui proses kurasi",
                  },
                  {
                    title: "Harga Kompetitif",
                    desc: "Harga terbaik sesuai kualitas produk",
                  },
                  {
                    title: "Pelayanan Cepat",
                    desc: "Admin responsif dan siap membantu",
                  },
                  {
                    title: "Experience Unik",
                    desc: "Belanja nyaman dengan konsep modern",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#F5F5F5] border border-gray-100 rounded-3xl p-6 hover:-translate-y-1 hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#DB4444] mb-5"></div>

                    <h3 className="font-semibold text-lg mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* COMMITMENT */}
            <section>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-[#DB4444] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>

                <div className="relative bg-[#F5F5F5] border border-gray-200 rounded-3xl px-8 py-14 text-center">
                  <span className="text-[#DB4444] font-semibold text-sm uppercase tracking-wider">
                    Our Commitment
                  </span>

                  <h2 className="text-3xl font-bold mt-4 mb-6">
                    Komitmen Kami
                  </h2>

                  <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
                    {about?.commitment_text}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}