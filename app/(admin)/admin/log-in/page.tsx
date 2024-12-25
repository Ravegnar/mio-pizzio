import { LoginForm } from "@/components/form/login-form";
import { Message } from "@/types/auth-types";

interface Props {
   searchParams?: Promise<Message>;
}

export default async function LogInPage(props: Props) {
   const message = await props.searchParams;

   return <LoginForm message={message} />;
}
