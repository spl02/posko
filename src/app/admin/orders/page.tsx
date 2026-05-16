import { createClient } from "../../../../utils/supabase/client";
import { ServiceOrderSection } from "../components/ServiceOrderSection";

export const revalidate = 0;

export default async function ServiceOrdersPage() {
  const supabase = createClient();

  // 1. FETCH ORDERS + JOIN STATUS
  const { data: orders } = await supabase
    .from("service_orders")
    .select(`
      *,
      service_statuses (
        id,
        name,
        color
      )
    `)
    .order("created_at", { ascending: false });

  // 2. FETCH STATUSES
  const { data: statuses } = await supabase
    .from("service_statuses")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ServiceOrderSection
      initialOrders={orders || []}
      statuses={statuses || []}
    />
  );
}