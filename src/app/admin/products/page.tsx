import { createClient } from "../../../../utils/supabase/client";
import { ProductSection } from "../components/ProductSection";
import { PackageOpen } from "lucide-react";

export const revalidate = 0;

export default async function ProductsPage() {
  const supabase = await createClient();

  // Fetch data awal di server
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