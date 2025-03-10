"use client";

import * as React from "react";
import { ChevronRight, GalleryVerticalEnd } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { NavUser } from "./nav-user";
import { Calendar } from "./ui/calendar";
import { es } from "date-fns/locale";

const data = {
  navMain: [
    {
      title: "Usuarios",
      items: [
        {
          title: "Administradores",
          url: "/school/admins",
        },
        {
          title: "Preceptores",
          url: "/school/preceptors",
        },
      ],
    },
    {
      title: "Institución",
      items: [
        {
          title: "Aulas",
          url: "/school/classrooms",
        },
      ],
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const today = new Date();

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                SchoolSync
              </h4>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="mx-auto my-4">
          <Calendar selected={today} locale={es} />
        </div>
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.url)}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
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
