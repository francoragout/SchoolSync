"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ExamSchema } from "@/lib/zod";
import { Pencil } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function ExamsTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const exam = ExamSchema.parse(row.original);
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button asChild variant="ghost" size="sm">
            <Link href={`${pathname}/${exam.id}/update`}>
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
