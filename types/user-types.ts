import { UserMetadata } from "@supabase/auth-js";

export interface Me {
   id: string;
   email?: string;
   metadata: UserMetadata;
}
