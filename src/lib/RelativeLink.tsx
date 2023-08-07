"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { PropsWithChildren } from "react";

export const RelativeLink = ({
  children,
  href,
  ...props
}: PropsWithChildren<{ className?: string; href: string }>) => {
  const pathname = usePathname();

  return (
    <Link {...props} href={href.startsWith("/") ? href : `${pathname}/${href}`}>
      {children}
    </Link>
  );
};
