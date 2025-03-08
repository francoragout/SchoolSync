"use client";

import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export function TableSkeleton() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-full space-y-4">
      {(pathname === "/school/admins" ||
        pathname === "/school/preceptors" ||
        pathname.endsWith("/tutors")) && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[78px]" />
        </div>
      )}
      {pathname === "/school/classrooms" && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] xl:w-[307px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[78px]" />
        </div>
      )}
      {pathname.endsWith("/students") && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[150px] lg:w-[250px]" />
          <Skeleton className="h-[32px] w-[148px] md:w-[249px]" />
        </div>
      )}
      {pathname.endsWith("/attendance") && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[40px] xl:w-[96px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[78px]" />
        </div>
      )}
      {pathname.endsWith("/exams") && (
        <div className="flex justify-between">
          <Skeleton className="h-[32px] w-[40px] xl:w-[122px]" />
          <Skeleton className="h-[32px] w-[40px] md:w-[78px]" />
        </div>
      )}

      <div className="space-y-2">
        <Skeleton className="h-[48px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
        <Skeleton className="h-[57px]" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-[32px] w-[493px]" />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return <Skeleton className="h-[358px] w-full" />;
}

export function FormSkeletonSM() {
  return <Skeleton className="h-[266px] w-full" />;
}
