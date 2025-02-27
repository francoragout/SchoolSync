"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BellIcon, EyeIcon } from "lucide-react";

export default function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <BellIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
          <Badge className="absolute top-0 right-[-0.3rem] inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none rounded-full">
            3
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-between items-center space-x-4">
          <DropdownMenuLabel>Notificaciónes</DropdownMenuLabel>
          <Button
            size="sm"
            className="h-6 me-2 rounded-full border-primary"
            
          >
            
            <EyeIcon className="h-4 w-4"/>
          </Button>
        </div>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
