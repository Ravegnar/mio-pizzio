import { Button } from "./ui/button";
import Link from "next/link";
import { User } from "@supabase/auth-js";
import { signOutAction } from "@/app/actions";

interface Props {
   user: User | null;
}

export default function AuthButton(props: Props) {
   return props.user ? (
      <div className="flex items-center gap-4 first-letter:uppercase">
         <span className="max-md:hidden">{props.user.email?.split("@")[0]}</span>
         <form action={signOutAction}>
            <Button size="sm" type="submit" variant="outline">
               Sign out
            </Button>
         </form>
      </div>
   ) : (
      <div className="flex gap-2">
         <Button asChild size="sm" variant="outline">
            <Link href="/admin/sign-in">Sign in</Link>
         </Button>
         <Button asChild size="sm" variant="default">
            <Link href="/admin/sign-up">Sign up</Link>
         </Button>
      </div>
   );
}
