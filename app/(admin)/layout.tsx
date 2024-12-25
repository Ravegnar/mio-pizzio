import "@/app/globals.css";
//import DeployButton from "@/components/deploy-button"; // TODO
//import { EnvVarWarning } from "@/components/env-var-warning";
import { GeistSans } from "geist/font/sans";
//import HeaderAuth from "@/components/header-auth";
//import Link from "next/link";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { getBasicAuth } from "@/utils/getBasicAuth";
//import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
   metadataBase: new URL(defaultUrl),
   title: "Next.js and Supabase Starter Kit",
   description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
   const hasBasicAuth = await getBasicAuth();

   return (
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
         <body className="bg-background text-foreground">
            {hasBasicAuth ? (
               <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                  <main className="min-h-screen flex flex-col items-center">
                     {children}
                     {/*
                     <div className="flex-1 w-full flex flex-col gap-20 items-center">
                        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                           <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                              <div className="flex gap-5 items-center font-semibold">
                                 <Link href={"/"}>Next.js Supabase Starter</Link>
                                 <div className="flex items-center gap-2">
                                    <DeployButton />
                                 </div>
                              </div>
                              {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                           </div>
                        </nav>
                        <div className="flex flex-col gap-20 max-w-5xl p-5">{children}</div>

                        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                           <p>
                              Powered by{" "}
                              <a
                                 href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                 target="_blank"
                                 className="font-bold hover:underline"
                                 rel="noreferrer"
                              >
                                 Supabase
                              </a>
                           </p>
                           <ThemeSwitcher />
                        </footer>
                     </div>*/}
                     <ThemeSwitcher />
                  </main>
               </ThemeProvider>
            ) : (
               children
            )}
         </body>
      </html>
   );
}