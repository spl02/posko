const IconHeart = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

export default function Header() {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold tracking-tight">PosKo</h1>
        </div>

        <nav className="hidden md:flex gap-8 font-medium">
          <a
            href="/"
            className="hover:text-[#DB4444] transition underline-offset-4"
          >
            Beranda
          </a>
          <a
            href="/about"
            className="hover:text-[#DB4444] transition underline-offset-4"
          >
            Tentang{" "}
          </a>
          <a
            href="/catalog"
            className="hover:text-[#DB4444] transition underline-offset-4"
          >
            Katalog
          </a>
          <a
            href="/contact"
            className="hover:text-[#DB4444] transition underline-offset-4"
          >
            Kontak
          </a>
        </nav>
      </div>
    </header>
  );
}
