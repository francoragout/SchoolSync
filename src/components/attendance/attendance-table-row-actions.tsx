"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AttendanceSchema } from "@/lib/zod";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function AttendanceTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const attendance = AttendanceSchema.parse(row.original);
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button asChild variant="ghost" size="sm">
            <Link href={`${pathname}/${attendance.id}/update`}>
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
