import { Me } from "@/types/user-types";
import { createClient } from "@/lib/supabase/server";

export async function getMe(): Promise<Me> {
   const supabase = await createClient();

   const {
      data: { user },
      error,
   } = await supabase.auth.getUser();

   if (!user || error) {
      throw new Error("Me data is missing");
   }

   return { id: user.id, email: user.email, metadata: user.user_metadata };
}
