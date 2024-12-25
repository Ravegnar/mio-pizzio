import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getBasicAuth } from "@/utils/getBasicAuth";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
   const hasBasicAuth = await getBasicAuth();

   if (hasBasicAuth) {
      await updateSession(request);
   } else {
      return NextResponse.error();
   }

   const url = request.nextUrl.clone();

   if (url.pathname === "/admin") {
      const supabase = await createClient();
      const {
         data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
         return NextResponse.redirect(new URL("/admin/log-in", request.url));
      }
   }
   return NextResponse.next();
}

export const config = {
   matcher: [
      /*
       * Match all request paths except:
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
       * Feel free to modify this pattern to include more paths.
       */
      "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
   ],
};
