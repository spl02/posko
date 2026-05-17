"use client";
import { supabase } from "../../../../utils/supabase/client";
import { ProductSection } from "../components/ProductSection";

export const revalidate = 0;

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 max-w-7xl">
      <ProductSection initialProducts={products || []} />
    </div>
  );
}