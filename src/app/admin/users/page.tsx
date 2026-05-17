import { createClient } from "../../../../utils/supabase/server";
import { UserSection } from "../components/UserSection";
import { ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function UsersPage() {
  const supabase = await createClient();
  
  const { data: admins } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "admin")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8 max-w-7xl">
      <UserSection initialAdmins={admins || []} />
    </div>
  );
}