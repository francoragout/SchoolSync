import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function SchoolPage() {

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/login");
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
