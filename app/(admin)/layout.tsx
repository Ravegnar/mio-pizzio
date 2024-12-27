import "@/app/globals.css";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { SWRProvider } from "@/components/providers/swr-provider";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@ui/toaster";
import { getBasicAuth } from "@/utils/getBasicAuth";

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
                  <SWRProvider>
                     <main className="min-h-screen flex flex-col items-center">
                        <SidebarProvider>
                           <AppSidebar />
                           <SidebarInset>
                              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                 <div className="flex items-center gap-2 px-4">
                                    <SidebarTrigger className="-ml-1" />
                                    <Separator orientation="vertical" className="mr-2 h-4" />
                                    <Breadcrumb>
                                       <BreadcrumbList>
                                          <BreadcrumbItem className="hidden md:block">
                                             <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                                          </BreadcrumbItem>
                                          <BreadcrumbSeparator className="hidden md:block" />
                                          <BreadcrumbItem>
                                             <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                          </BreadcrumbItem>
                                       </BreadcrumbList>
                                    </Breadcrumb>
                                 </div>
                              </header>
                              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
                           </SidebarInset>
                        </SidebarProvider>
                     </main>
                     <Toaster />
                  </SWRProvider>
               </ThemeProvider>
            ) : (
               children
            )}
         </body>
      </html>
   );
}
