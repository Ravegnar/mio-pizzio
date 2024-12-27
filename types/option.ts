import { ComponentType } from "react";

export interface Option {
   label: string;
   value: unknown;
   icon?: ComponentType<{ className?: string }>;
   count?: number;
}
