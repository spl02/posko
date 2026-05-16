"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

const supabase = createClient();

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

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

  return (
    <footer className="bg-black text-white pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

            <p className="text-gray-400 leading-relaxed text-sm">
              {settings?.site_description ||
                "Toko komputer dan sparepart gaming terpercaya dengan produk original dan harga terbaik."}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#DB4444] transition flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}

              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#DB4444] transition flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
              )}

              {settings?.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-[#DB4444] transition flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 7.5a5.5 5.5 0 0 1-4-1.7V15a5 5 0 1 1-5-5h.5v3A2 2 0 1 0 12 15V2h3a5.5 5.5 0 0 0 4 4v1.5z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Navigasi</h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-white transition">
                Beranda
              </Link>

              <Link href="/catalog" className="hover:text-white transition">
                Katalog
              </Link>

              <Link href="/cart" className="hover:text-white transition">
                Keranjang
              </Link>

              <Link href="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Marketplace</h3>

            <div className="flex flex-col gap-4 text-sm text-gray-400">
              {settings?.shopee_url && (
                <a
                  href={settings.shopee_url}
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Shopee Official Store
                </a>
              )}

              {settings?.tokopedia_url && (
                <a
                  href={settings.tokopedia_url}
                  target="_blank"
                  className="hover:text-white transition"
                >
                  Tokopedia Official Store
                </a>
              )}

              {settings?.whatsapp_number && (
                <a
                  href={`https://wa.me/${settings.whatsapp_number}`}
                  target="_blank"
                  className="hover:text-white transition"
                >
                  WhatsApp Admin
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Kontak</h3>

            <div className="space-y-4 text-sm text-gray-400">
              <p>{settings?.address || "Alamat belum diatur"}</p>

              <p>{settings?.contact_email || "Email belum diatur"}</p>

              <p>
                {settings?.whatsapp_number ||
                  "Nomor WhatsApp belum diatur"}
              </p>
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

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            {settings?.site_name || "PosKo"}.
            All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}