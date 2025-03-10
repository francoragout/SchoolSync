import * as React from "react"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { DropdownMenuSeparator } from "./ui/dropdown-menu"

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b">
        <NavUser />
        <DropdownMenuSeparator />
      </SidebarHeader>
    </Sidebar>
  )
}
