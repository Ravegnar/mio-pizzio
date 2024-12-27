import { Option } from "@/types/option";
import { StringKeyOf } from "@/types/index";

export interface DataTableFilterField<TData> {
   id: StringKeyOf<TData>;
   label: string;
   placeholder?: string;
   options?: Option[];
}
