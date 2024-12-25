import { Message } from "@/types/auth-types";

interface Props {
   message?: Message;
}

export function FormMessage(props: Props) {
   if (!props.message) {
      return null;
   }

   //TODO nefunguje
   return (
      <div className="flex flex-col gap-2 w-full max-w-md text-sm">
         {"success" in props.message && (
            <div className="text-foreground border-l-2 border-foreground px-4">{props.message.success}</div>
         )}
         {"error" in props.message && (
            <div className="text-destructive-foreground border-l-2 border-destructive-foreground px-4">
               {props.message.error}
            </div>
         )}
         {"message" in props.message && <div className="text-foreground border-l-2 px-4">{props.message.message}</div>}
      </div>
   );
}
