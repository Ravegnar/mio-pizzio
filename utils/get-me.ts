import { createClient } from "@/utils/supabase/server";

export async function getMe() {
   const supabase = await createClient();

   const {
      data: { user },
      error,
   } = await supabase.auth.getUser();

   if (!user || error) {
      console.error("Error fetching user:", error);
      return { props: { user: null } };
   }

   return { id: user.id, email: user.email, metadata: user.user_metadata };
}
