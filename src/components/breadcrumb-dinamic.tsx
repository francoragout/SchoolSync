"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/lib/store";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BreadcrumbDinamic() {
  const pathnameTranslate = useSelector(
    (state: RootState) => state.breadcrumb.value
  );
  const pathname = usePathname();

  const [pathSegments, setPathSegments] = useState<string[]>([]);
  const [pathSegmentsTranslate, setPathSegmentsTranslate] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (pathname && pathnameTranslate) {
      setPathSegments(pathname.split("/").filter(Boolean));
      setPathSegmentsTranslate(pathnameTranslate.split("/").filter(Boolean));
    }
  }, [pathname, pathnameTranslate]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const isFirst = index === 0;
          const isLast = index === pathSegments.length - 1;
          const translatedSegment = pathSegmentsTranslate[index] || segment;
          const hasSpace = translatedSegment.includes(" ");
          const isTutors = segment === "tutors";
          const isAttendance = segment === "attendance";
          const isExams = segment === "exams";

          const getDropdownItems = (segment: string) => {
            const items = [];
            if (segment === "tutors") {
              items.push({ href: "/attendance", label: "Asistencia" });
              items.push({ href: "/exams", label: "Exámenes" });
            } else if (segment === "attendance") {
              items.push({ href: "/tutors", label: "Tutores" });
              items.push({ href: "/exams", label: "Exámenes" });
            } else if (segment === "exams") {
              items.push({ href: "/tutors", label: "Tutores" });
              items.push({ href: "/attendance", label: "Asistencia" });
            }
            return items;
          };

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast && (isTutors || isAttendance || isExams) ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      {translatedSegment}
                      <ChevronDownIcon className="text-primary" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {getDropdownItems(segment).map((item) => (
                        <DropdownMenuItem key={item.href}>
                          <BreadcrumbLink asChild>
                            <Link
                              className="w-full"
                              href={`${pathname.replace(
                                /\/(tutors|attendance|exams)$/,
                                item.href
                              )}`}
                            >
                              {item.label}
                            </Link>
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : isFirst || isLast || hasSpace ? (
                  <span className={isLast ? "font-normal text-foreground" : ""}>
                    {translatedSegment}
                  </span>
                ) : (
                  <BreadcrumbLink
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {translatedSegment}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && (
                <BreadcrumbSeparator className="text-primary" />
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
