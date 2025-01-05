import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
   children: ReactNode;
}

export default async function RootLayout(props: Props) {
   const { children } = props;

   return (
      <html lang="en" className={GeistSans.className} suppressHydrationWarning>
         <body className="bg-background text-foreground">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
