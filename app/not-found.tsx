import Link from "next/link";

export default function NotFound() {
   //TODO
   return (
      <div>
         <h2>Not Found</h2>
         <p>Could not find requested resource</p>
         <Link href="/admin">Return Home</Link>
      </div>
   );
}
