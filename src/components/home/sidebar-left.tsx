"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Calendar } from "../ui/calendar";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { NavUser } from "../nav-user";
import { es } from "date-fns/locale";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const today = new Date();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/students">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ShoolSync</span>
                  <span className="">Alumnos</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <DropdownMenuSeparator />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mx-auto">
        <Calendar selected={today} locale={es} />
      </SidebarContent>
      <SidebarFooter>
        <div className="lg:hidden">
          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
