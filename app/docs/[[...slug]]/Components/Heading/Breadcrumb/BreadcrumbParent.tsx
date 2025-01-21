"use client";

import Link from "fumadocs-core/link";
import { ChevronLeftIcon } from "lucide-react";

export type BreadcrumbParentProps = {
  url: string;
  children: React.ReactNode;
};

export default function BreadcrumbParent({ url, children }: BreadcrumbParentProps) {
  const scrollToTop = () => window.scrollTo({ top: 0 });

  return (
    <Link
      onClick={scrollToTop}
      href={url}  
      className="inline-flex items-center Text-black/white text-opacity-60 no-underline"
    >
      <ChevronLeftIcon className="mx-1 size-4 stroke-[3]" />
      {children}
    </Link>
  );
}
