import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import BreadcrumbDinamic from "@/components/breadcrumb-dinamic";
import { Separator } from "@/components/ui/separator";
import Notifications from "@/components/notifications";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SchoolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user?.role === "TUTOR") {
    redirect("/students");
  }
  return (
    <SessionProvider>
      <SidebarProvider>
        <SidebarLeft />
        <SidebarInset className="overflow-x-auto">
          <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbDinamic />
            </div>
            <div className="flex justify-end px-3">
              <Notifications />
            </div>
          </header>
          <div className="gap-4 p-4">{children}</div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </SessionProvider>
  );
}
