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
import { ReactNode } from "react";
import { SWRProvider } from "@/components/providers/swr-provider";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@ui/toaster";
import { getBasicAuth } from "@/utils/getBasicAuth";
import { getMe } from "@/utils/get-me";

interface Props {
   children: ReactNode;
}

export default async function RootLayout(props: Props) {
   const { children } = props;
   const user = await getMe(); // TODO

   console.log("%c<<< user >>>", "background: #222; color: goldenrod", user);

   const hasBasicAuth = await getBasicAuth();

   return hasBasicAuth ? (
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
   ) : (
      children
   );
}
