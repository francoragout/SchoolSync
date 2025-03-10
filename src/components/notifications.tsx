"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BellIcon, EyeIcon } from "lucide-react";
import { z } from "zod";
import { NotificationSchema } from "@/lib/zod";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { UpdateNotifications } from "@/actions/notification";
import { Icons } from "./icons";

type Notification = z.infer<typeof NotificationSchema>;

export default function Notifications({
  notifications,
  userId,
}: {
  notifications: Notification[];
  userId: string;
}) {
  // Sort notifications by date
  const sortedNotifications = notifications.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const [notReadNotifications, setNotReadNotifications] = useState(
    sortedNotifications.filter((notification) => !notification.read)
  );

  useEffect(() => {
    setNotReadNotifications(
      notifications.filter((notification) => !notification.read)
    );
  }, [notifications]);

  const ids = notReadNotifications.map((notification) => notification.id);

  const [isPending, startTransition] = useTransition();

  function handleMarkAsRead() {
    startTransition(() => {
      UpdateNotifications(userId, ids).then((response) => {
        if (response.success) {
          setNotReadNotifications([]);
          notifications.forEach((notification) => {
            notification.read = true;
          });
        }
      });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <BellIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          <Badge className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full ">
            <span className="my-auto">{notReadNotifications.length}</span>
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-between items-center pe-1">
          <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
          <Button
            size="sm"
            className="h-6 rounded-full border-primary"
            onClick={handleMarkAsRead}
          >
            {(isPending && (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            )) || <EyeIcon className="h-4 w-4" />}
          </Button>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea className="flex h-96">
          {notifications.length === 0 && (
            <DropdownMenuItem className="flex justify-center">
              Sin resultados.
            </DropdownMenuItem>
          )}
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-1">
              <Link href={notification.link}>
                <Alert
                  className={clsx(
                    "flex w-80",
                    notification.read ? "bg-secondary" : ""
                  )}
                >
                  <div className="flex flex-col">
                    <AlertTitle
                      className={clsx(
                        "font-semibold",
                        notification.read ? "text-muted-foreground" : ""
                      )}
                    >
                      {notification.title}
                    </AlertTitle>
                    <AlertDescription
                      className={clsx(
                        notification.read ? "text-muted-foreground" : ""
                      )}
                    >
                      {notification.body}
                    </AlertDescription>
                  </div>
                </Alert>
              </Link>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
