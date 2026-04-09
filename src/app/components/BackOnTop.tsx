import { IconChevronUp } from "./Icon";
import { useState, useEffect } from "react";

export default function BackOnTop() {
  const [showScroll, setShowScroll] = useState(false);

  // Fungsi untuk menampilkan tombol scroll to top
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 bg-white text-black p-3 rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition-opacity duration-300 z-50 ${showScroll ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <IconChevronUp />
    </button>
  );
}
