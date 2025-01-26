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
      className="Text-black/white inline-flex items-center text-opacity-60 no-underline"
    >
      <ChevronLeftIcon className="mx-1 size-4 stroke-[3]" />
      {children}
    </Link>
  );
}
