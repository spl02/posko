"use client"
import BackOnTop from '@/app/components/BackOnTop';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { IconEye, IconHeart, IconSearch, IconStar } from '@/app/components/Icon';
import Promote from '@/app/components/Promote';

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
}

const allProducts: Product[] = [
  { id: '1', name: 'The north coat', price: 260, oldPrice: 360, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Jaket+Merah' },
  { id: '2', name: 'Gucci duffle bag', price: 960, oldPrice: 1160, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Tas+Gucci' },
  { id: '3', name: 'RGB liquid CPU Cooler', price: 160, oldPrice: 170, rating: 4.5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=CPU+Cooler' },
  { id: '4', name: 'Small BookSelf', price: 360, rating: 5, reviews: 65, image: 'https://placehold.co/400x400/f5f5f5/333?text=Rak+Buku' },
  
  { id: '5', name: 'HAVIT HV-G92 Gamepad', price: 120, oldPrice: 160, rating: 5, reviews: 88, image: 'https://placehold.co/400x400/f5f5f5/333?text=Gamepad' },
  { id: '6', name: 'AK-900 Wired Keyboard', price: 960, oldPrice: 1160, rating: 4, reviews: 75, image: 'https://placehold.co/400x400/f5f5f5/333?text=Keyboard' },
  { id: '7', name: 'IPS LCD Gaming Monitor', price: 370, oldPrice: 400, rating: 5, reviews: 98, image: 'https://placehold.co/400x400/f5f5f5/333?text=Monitor' },
  { id: '8', name: 'S-Series Comfort Chair', price: 375, oldPrice: 400, rating: 4.5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Kursi+Abu' },

  // Menduplikasi baris kedua untuk melengkapi grid sesuai gambar
  { id: '9', name: 'HAVIT HV-G92 Gamepad', price: 120, oldPrice: 160, rating: 5, reviews: 88, image: 'https://placehold.co/400x400/f5f5f5/333?text=Gamepad' },
  { id: '10', name: 'AK-900 Wired Keyboard', price: 960, oldPrice: 1160, rating: 4, reviews: 75, image: 'https://placehold.co/400x400/f5f5f5/333?text=Keyboard' },
  { id: '11', name: 'IPS LCD Gaming Monitor', price: 370, oldPrice: 400, rating: 5, reviews: 98, image: 'https://placehold.co/400x400/f5f5f5/333?text=Monitor' },
  { id: '12', name: 'S-Series Comfort Chair', price: 375, oldPrice: 400, rating: 4.5, reviews: 99, image: 'https://placehold.co/400x400/f5f5f5/333?text=Kursi+Abu' },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col group cursor-pointer w-full">
      {/* Container Gambar */}
      <div className="relative bg-[#F5F5F5] rounded-md h-[250px] p-4 flex items-center justify-center overflow-hidden">
        
        {/* Ikon Aksi Hover (Heart & Eye) di Kanan Atas */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconHeart /></button>
          <button className="bg-white p-1.5 rounded-full hover:bg-gray-100 transition"><IconEye /></button>
        </div>

        {/* Gambar Produk */}
        <img src={product.image} alt={product.name} className="object-contain w-3/4 h-3/4 group-hover:scale-105 transition-transform duration-300" />

        {/* Tombol Add to Cart (Muncul dari bawah saat Hover) */}
        <button className="absolute bottom-0 left-0 w-full bg-black text-white py-2.5 font-medium opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Add To Cart
        </button>
      </div>

      {/* Info Produk */}
      <div className="mt-4 flex flex-col gap-1.5">
        <h3 className="font-medium text-black text-base line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-3">
          {/* Sesuai desain, menggunakan simbol Dollar $ */}
          <span className="text-[#DB4444] font-medium">${product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-sm">${product.oldPrice}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IconStar key={star} filled={star <= Math.floor(product.rating)} />
            ))}
          </div>
          <span className="text-gray-500 text-sm font-medium">({product.reviews})</span>
        </div>
      </div>
    </div>
  );
};


// --- Komponen Utama (Halaman Katalog) ---
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      <Promote />
      <Header />

      {/* Area Konten Utama */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Judul & Pencarian */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Katalog Produk</h2>
          <p className="text-gray-600 text-sm mb-10 text-center">
            Temukan berbagai kebutuhan teknologi dan aksesoris terbaik untuk mendukung aktivitas Anda.
          </p>
          
          {/* Kolom Pencarian */}
          <div className="w-full max-w-3xl relative">
            <input 
              type="text" 
              placeholder="Apa yang Anda cari" 
              className="w-full bg-[#F5F5F5] border-none rounded-md py-3.5 pl-6 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
            <button className="absolute right-4 top-3 text-gray-500 hover:text-black transition">
              <IconSearch />
            </button>
          </div>
        </div>

        {/* Section Header: All Product */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-5 h-10 bg-[#DB4444] rounded-sm"></div>
            <span className="text-[#DB4444] font-semibold text-base">This Month</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-wider text-black">All Product</h2>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}