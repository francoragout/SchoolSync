"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { UserSchema } from "@/lib/zod";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PreceptorsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = UserSchema.parse(row.original);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/preceptors/${user.id}/update`}>
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
