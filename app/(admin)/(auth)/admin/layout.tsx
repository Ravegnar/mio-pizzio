import { ReactNode } from "react";

interface Props {
   children: ReactNode;
}

export default async function RootLayout(props: Props) {
   return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
         <div className="w-full max-w-sm">{props.children}</div>
      </div>
   );
}
