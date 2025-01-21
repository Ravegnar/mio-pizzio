export function formatStringArray<T extends Record<string, unknown>>(items: T[], key?: keyof T): string {
   if (items.length === 0) return "";
   if (items.length === 1) return key ? String(items[0][key]) : String(items[0]);

   const lastItem = [...items].pop();

   const formattedItems = [...items].map((item) => (key ? String(item[key]) : String(item)));
   const lastFormattedItem = key && lastItem ? String(lastItem[key]) : String(lastItem);

   return `${formattedItems.join(", ")} a ${lastFormattedItem}`;
}
