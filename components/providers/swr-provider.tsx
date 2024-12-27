"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { getFetcher } from "@/utils/fetchers";

export const SWRProvider = ({ children }: { children: ReactNode }) => {
   return (
      <SWRConfig
         value={{
            fetcher: getFetcher,
            refreshInterval: 0,
            revalidateOnFocus: false,
         }}
      >
         {children}
      </SWRConfig>
   );
};
