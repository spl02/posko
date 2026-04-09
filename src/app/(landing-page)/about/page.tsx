"use client"
import BackOnTop from '@/app/components/BackOnTop';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Promote from '@/app/components/Promote';

interface Feature {
  id: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'f1',
    title: 'Produk Lengkap',
    description: 'Semua kebutuhan teknologi Anda tersedia dalam satu tempat',
  },
  {
    id: 'f2',
    title: 'Kualitas Terjamin',
    description: 'Produk yang kami tawarkan telah melalui proses seleksi kualitas',
  },
  {
    id: 'f3',
    title: 'Harga Kompetitif',
    description: 'Kami memberikan harga terbaik sesuai dengan kualitas produk',
  },
  {
    id: 'f4',
    title: 'Pelayanan Terbaik',
    description: 'Tim kami siap membantu Anda dengan respons cepat dan ramah',
  },
  {
    id: 'f5',
    title: 'Pengalaman Berbeda',
    description: 'Belanja teknologi sambil menikmati kopi dalam satu konsep unik',
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col relative">
      {/* Top Banner Pengumuman */}
      <Promote />
      {/* Header / Navigasi */}
      <Header />

      {/* Konten Utama */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        
        {/* Section 1: Tentang PosKo */}
        <section className="w-full text-center mb-20">
          <h2 className="text-2xl font-bold mb-8">Tentang PosKo</h2>
          <div className="border-t border-gray-200 w-full mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto text-[15px]">
            PosKo adalah sebuah instansi yang bergerak di bidang teknologi dan kebutuhan digital modern, yang berfokus
            pada penyediaan berbagai produk berkualitas untuk menunjang aktivitas kerja, belajar, dan hiburan Anda.
            Kami hadir sebagai solusi lengkap bagi kebutuhan perangkat komputer dan aksesoris, mulai dari sparepart
            komputer, laptop, mouse, keyboard, printer, hingga aksesoris seperti stand laptop & HP serta headphone. Tidak
            hanya itu, PosKo juga menghadirkan produk kopi pilihan, untuk menemani produktivitas Anda sehari-hari.
          </p>
        </section>

        {/* Section 2: Visi dan Misi */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Visi */}
          <div className="text-center md:pr-10">
            <h3 className="text-xl font-bold mb-6">Visi</h3>
            <p className="text-gray-700 leading-relaxed text-[15px]">
              Menjadi penyedia produk teknologi dan
              aksesoris terpercaya yang mampu
              memenuhi kebutuhan masyarakat
              dengan kualitas terbaik dan pelayanan
              maksimal.
            </p>
          </div>
          
          {/* Garis Pemisah Vertikal (Desktop) / Horizontal (Mobile) */}
          <div className="hidden md:block w-px bg-gray-200 absolute left-1/2 transform -translate-x-1/2 h-48 mt-2"></div>
          <div className="md:hidden w-full h-px bg-gray-200 my-2"></div>

          {/* Misi */}
          <div className="md:pl-10 text-center md:text-left">
            <h3 className="text-xl font-bold mb-6">Misi</h3>
            <ul className="text-gray-700 leading-relaxed space-y-2 list-disc list-outside ml-5 text-[15px] text-left">
              <li>Menyediakan produk teknologi yang berkualitas dan terpercaya</li>
              <li>Memberikan harga yang kompetitif dan terjangkau</li>
              <li>Menghadirkan pelayanan yang cepat, ramah, dan profesional</li>
              <li>Mengikuti perkembangan teknologi untuk memenuhi kebutuhan pelanggan</li>
              <li>Memberikan pengalaman belanja yang nyaman dan praktis</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Mengapa Memilih PosKo */}
        <section className="w-full text-center mb-24">
          <div className="border-t border-gray-200 w-full mb-10"></div>
          <h2 className="text-2xl font-bold mb-12">Mengapa Memilih PosKo</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="flex flex-col items-center">
                {/* Lingkaran Hitam Placeholder (Sesuai Desain) */}
                <div className="w-16 h-16 bg-black rounded-full mb-6 shadow-sm flex items-center justify-center">
                  {/* Bisa ditambahkan ikon SVG di dalam sini jika ingin tidak sekadar lingkaran hitam */}
                  <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
                </div>
                <h4 className="font-bold text-sm mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed max-w-[180px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Komitmen Kami */}
        <section className="w-full text-center mb-10">
          <div className="border-t border-gray-200 w-full mb-10"></div>
          <h2 className="text-2xl font-bold mb-8">Komitmen Kami</h2>
          <div className="border-b border-gray-200 w-full mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto text-[15px]">
            PosKo berkomitmen untuk terus berkembang dan menjadi mitra terpercaya bagi pelanggan dalam memenuhi
            kebutuhan teknologi sehari-hari. Kami percaya bahwa teknologi yang tepat dapat meningkatkan produktivitas dan
            kualitas hidup.
          </p>
        </section>

      </main>

      <Footer />
      <BackOnTop />
    </div>
  );
}