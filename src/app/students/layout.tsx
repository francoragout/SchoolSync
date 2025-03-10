import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import BreadcrumbDinamic from "@/components/breadcrumb-dinamic";
import { Separator } from "@/components/ui/separator";
import Notifications from "@/components/notifications";
import { SessionProvider } from "next-auth/react";
import { SidebarLeft } from "@/components/home/sidebar-left";
import { SidebarRight } from "@/components/home/sidebar-right";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { z } from "zod";
import { NotificationSchema } from "@/lib/zod";

const URL = process.env.API_URL;

type Notification = z.infer<typeof NotificationSchema>;

async function GetNotifications(userId: string): Promise<Notification[]> {
  const data = await fetch(`${URL}/api/notifications/user/${userId}`, {
    cache: "no-store",
  });

  const notifications = await data.json();

  return notifications.map((notification: Notification) => {
    notification.createdAt = new Date(notification.createdAt);
    return NotificationSchema.parse(notification);
  });
}

export default async function SchoolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const userId = session?.user?.id as string;
  const notifications = await GetNotifications(userId);

  if (session?.user?.role !== "TUTOR") {
    redirect("/school/classrooms");
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
              <Notifications notifications={notifications} userId={userId} />
            </div>
          </header>
          <div className="gap-4 p-4">{children}</div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </SessionProvider>
  );
}
