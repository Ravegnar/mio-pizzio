import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/types/auth-types";
import { SubmitButton } from "@/components/submit-button";
import { resetPasswordAction } from "@/app/actions";

export default async function ResetPassword(props: { searchParams: Promise<Message> }) {
   const searchParams = await props.searchParams;
   return (
      <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4 mx-auto mt-10">
         <h1 className="text-2xl font-medium">Reset password</h1>
         <p className="text-sm text-foreground/60">Please enter your new password below.</p>
         <Label htmlFor="password">New password</Label>
         <Input type="password" name="password" placeholder="New password" required />
         <Label htmlFor="confirmPassword">Confirm password</Label>
         <Input type="password" name="confirmPassword" placeholder="Confirm password" required />
         <SubmitButton formAction={resetPasswordAction}>Reset password</SubmitButton>
         <FormMessage message={searchParams} />
      </form>
   );
}
