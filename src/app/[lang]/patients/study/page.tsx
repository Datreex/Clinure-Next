// just redirect to the parent page
// nextjs 13
import { redirect } from "next/navigation";

export default function Page() {
  redirect("..");
  return <div>Redirecting...</div>;
}
