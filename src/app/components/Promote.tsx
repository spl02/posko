"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase/client";

export default function Promote() {
  const [description, setDescription] = useState("Penawaran spesial untuk semua pelanggan kami!");

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("site_description")
        .limit(1)
        .maybeSingle();

      if (data?.site_description) {
        setDescription(data.site_description);
      }
    };

    fetchSettings();
  }, []);

  return (
    <div className="bg-black text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center relative">
      <p className="text-center w-full md:w-auto">
        {description}
        <a href="/catalog" className="font-bold underline ml-2">
          Beli Sekarang
        </a>
      </p>
    </div>
  );
}