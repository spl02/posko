"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

export default function Footer() {
  const supabase = createClient();

  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();

      if (error) {
        console.error("SUPABASE ERROR:", error);
        return;
      }

      if (isMounted) {
        setSettings(data);
      }
    };

    fetchSettings();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              {settings?.logo_url && (
                <img
                  src={settings.logo_url}
                  alt={settings.site_name}
                  className="w-12 h-12 object-contain rounded-xl bg-white p-1"
                />
              )}

              <h2 className="text-3xl font-black tracking-tight">
                {settings?.site_name || "PosKo"}
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {settings?.site_description ||
                "Toko komputer dan sparepart gaming terpercaya dengan produk original dan harga terbaik."}
            </p>
          </div>

          {/* NAVIGASI */}
          <div>
            <h3 className="text-lg font-bold mb-6">Navigasi</h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">Beranda</Link>
              <Link href="/catalog" className="hover:text-white">Katalog</Link>
              <Link href="/cart" className="hover:text-white">Keranjang</Link>
              <Link href="/wishlist" className="hover:text-white">Wishlist</Link>
            </div>
          </div>

          {/* MARKETPLACE */}
          <div>
            <h3 className="text-lg font-bold mb-6">Marketplace</h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">

              {settings?.shopee_url && (
                <a href={settings.shopee_url} target="_blank" className="hover:text-white">
                  Shopee Official Store
                </a>
              )}

              {settings?.tokopedia_url && (
                <a href={settings.tokopedia_url} target="_blank" className="hover:text-white">
                  Tokopedia Official Store
                </a>
              )}

              {settings?.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number}`}
                  target="_blank"
                  className="hover:text-white"
                >
                  WhatsApp Admin
                </a>
              )}
            </div>
          </div>

          {/* KONTAK */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontak</h3>

            <div className="space-y-3 text-sm text-gray-400">
              <p>{settings?.address || "Alamat belum diatur"}</p>
              <p>{settings?.contact_email || "Email belum diatur"}</p>
              <p>{settings?.whatsapp_number || "Nomor WhatsApp belum diatur"}</p>
            </div>

            {settings?.google_maps_embed && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                <iframe
                  src={settings.google_maps_embed}
                  width="100%"
                  height="180"
                  loading="lazy"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {settings?.site_name || "PosKo"}.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}