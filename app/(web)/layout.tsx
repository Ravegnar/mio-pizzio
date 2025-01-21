import "@/app/globals.css";
import { ReactNode } from "react";
import { SWRProvider } from "@/components/providers/swr-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Toaster } from "@ui/toaster";
import { TooltipProvider } from "@ui/tooltip";
import { WebNavigationMenu } from "@/components/web-navigation-menu";
import { createClient } from "@/lib/supabase/server";
import { getBasicAuth } from "@/utils/getBasicAuth";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

console.log("%c<<< defaultUrl >>>", "background: #222; color: deepskyblue", defaultUrl);

export const metadata = {
   // TODO
   metadataBase: new URL(defaultUrl),
   title: "Next.js and Supabase Starter Kit",
   description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
   const hasBasicAuth = await getBasicAuth();

   const supabase = await createClient();

   const {
      data: { user },
   } = await supabase.auth.getUser();

   return hasBasicAuth ? (
      <SWRProvider>
         <TooltipProvider delayDuration={250}>
            <main className="flex-1 w-full min-h-screen flex flex-col gap-20 items-center">
               <WebNavigationMenu user={user} />

               <div className="container max-sm:px-4 max-md:px-6">{children}</div>

               <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 mt-auto">
                  <p>
                     Powered by{" "}
                     <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                     >
                        Hamsters
                     </a>
                  </p>
                  <ThemeSwitcher />
               </footer>
            </main>
            <Toaster />
         </TooltipProvider>
      </SWRProvider>
   ) : (
      children
   );
}
