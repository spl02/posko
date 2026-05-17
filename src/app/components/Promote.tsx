import React from "react";
import { supabase } from "../../../utils/supabase/client";

export default async function Promote() {
  const { data: settings } = await supabase
    .from("site_settings")
    .select("site_description")
    .limit(1)
    .maybeSingle();

  const description =
    settings?.site_description ||
    "Penawaran spesial untuk semua pelanggan kami!";

  return (
    <div className="bg-black text-white text-xs md:text-sm py-2 px-4 flex justify-center items-center relative">
      <p className="text-center w-full md:w-auto">
        {description}

        <a
          href="#"
          className="font-bold underline ml-2"
        >
          Beli Sekarang
        </a>
      </p>
    </div>
  );
}