import Layout from "@/components/layout";
import NotesPage from "@/app/protected/components/notes-page";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
