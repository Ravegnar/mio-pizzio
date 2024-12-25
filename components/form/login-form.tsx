import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComponentPropsWithoutRef } from "react";
import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Message } from "@/types/auth-types";
import { SubmitButton } from "@/components/submit-button";
import { cn } from "@/lib/utils";
import { signInAction } from "@/app/actions";

interface Props extends ComponentPropsWithoutRef<"div"> {
   className?: string;
   message?: Message;
}

export async function LoginForm(props: Props) {
   return (
      <div className={cn("flex flex-col gap-6", props.className)} {...props}>
         <Card>
            <CardHeader className="text-center">
               <CardTitle className="text-xl">Welcome back</CardTitle>
               <CardDescription>Login with your Apple or Google account</CardDescription>
            </CardHeader>
            <CardContent>
               <form>
                  <div className="grid gap-6">
                     <div className="grid gap-6">
                        <div className="grid gap-2">
                           <Label htmlFor="email">Email</Label>
                           <Input name="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="grid gap-2">
                           <div className="flex items-center">
                              <Label htmlFor="password">Password</Label>
                              <Link
                                 className="ml-auto text-sm underline-offset-4 hover:underline"
                                 href="/forgot-password"
                              >
                                 Forgot your password?
                              </Link>
                           </div>
                           <Input name="password" placeholder="Your password" type="password" required />
                        </div>
                        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
                           Sign in
                        </SubmitButton>
                        <FormMessage message={props.message} />
                     </div>
                     <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <a href="#" className="underline underline-offset-4">
                           Sign up
                        </a>
                     </div>
                  </div>
               </form>
            </CardContent>
         </Card>
         <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
            By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
         </div>
      </div>
   );
}
