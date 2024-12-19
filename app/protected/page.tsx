import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Layout from "@/components/layout";
import { ProtectedContent } from "@/app/protected/components/protected-content";
import NotesPage from "@/app/protected/components/notes-page";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <Layout>
      <NotesPage />
      {/*<ProtectedContent user={user} />*/}
    </Layout>
  );
}
