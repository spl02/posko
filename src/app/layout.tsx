import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Posko.com Laptop & Spareparts",
  description:
    "Tempat cari laptop berkualitas, servis dan spareparts terbaik di Lampung",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Posko.com Laptop & Spareparts",
    description:
      "Tempat cari laptop berkualitas, servis dan spareparts terbaik di Lampung",
    url: "https://posko-two.vercel.app",
    siteName: "Posko.com",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Posko.com",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Posko.com Laptop & Spareparts",
    description:
      "Tempat cari laptop berkualitas, servis dan spareparts terbaik di Lampung",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}