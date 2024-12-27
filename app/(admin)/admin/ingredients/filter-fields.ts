import { DataTableFilterField } from "@/types/data-table-filter-field";
import { Ingredient } from "@prisma/client";

export const filterFields: DataTableFilterField<Ingredient>[] = [
   {
      id: "name",
      label: "Name",
      placeholder: "Filter names...",
   },
   {
      id: "isActive",
      label: "Active",
      options: [
         {
            label: "true",
            value: true,
         },
         {
            label: "false",
            value: false,
            //icon: getStatusIcon(status),
            //count: 2,
         },
      ],
   },
   {
      id: "isGlutenFree",
      label: "Gluten free",
      options: [
         {
            label: "true",
            value: true,
         },
         {
            label: "false",
            value: false,
         },
      ],
   },
];
