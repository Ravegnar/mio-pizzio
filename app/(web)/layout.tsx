import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { WebNavigationMenu } from "@/components/web-navigation-menu";
import { createClient } from "@/utils/supabase/server";
import { getBasicAuth } from "@/utils/getBasicAuth";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

console.log("%c<<< defaultUrl >>>", "background: #222; color: deepskyblue", defaultUrl);

export const metadata = {
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

   return (
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
         <body className="bg-background text-foreground">
            {hasBasicAuth ? (
               <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                  <main className="min-h-screen flex flex-col items-center">
                     <div className="flex-1 w-full flex flex-col gap-20 items-center">
                        <WebNavigationMenu user={user} />

                        <div className="flex flex-col gap-20 max-w-5xl p-5">{children}</div>

                        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 mt-auto">
                           <p>
                              Powered by{" "}
                              <a
                                 href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                 target="_blank"
                                 className="font-bold hover:underline"
                                 rel="noreferrer"
                              >
                                 hamsters
                              </a>
                           </p>
                           <ThemeSwitcher />
                        </footer>
                     </div>
                  </main>
               </ThemeProvider>
            ) : (
               children
            )}
         </body>
      </html>
   );
}
