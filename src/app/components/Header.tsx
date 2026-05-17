import Link from "next/link";
import { supabase } from "../../../utils/supabase/client";
import { useState, useEffect } from "react";

const IconHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const IconUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function Header() {
  const [siteName, setSiteName] = useState("PosKo");
  const [logoUrl, setLogoUrl] = useState("/icon.png");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("site_name, logo_url")
        .limit(1)
        .maybeSingle();

      if (data?.site_name) setSiteName(data.site_name);
      if (data?.logo_url) setLogoUrl(data.logo_url);
    };

    fetchSettings();
  }, []);

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* LOGO + BRAND */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={siteName}
              className="w-10 h-10 object-cover rounded-xl"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
              {siteName.charAt(0)}
            </div>
          )}

          <h1 className="text-2xl font-bold tracking-tight">
            {siteName}
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="/" className="hover:text-[#DB4444] transition underline-offset-4">Beranda</Link>
          <Link href="/about" className="hover:text-[#DB4444] transition underline-offset-4">Tentang</Link>
          <Link href="/catalog" className="hover:text-[#DB4444] transition underline-offset-4">Katalog</Link>
          <Link href="/contact" className="hover:text-[#DB4444] transition underline-offset-4">Kontak</Link>
        </nav>
      </div>
    </header>
  );
}