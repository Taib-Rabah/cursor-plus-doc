"use client";

import Link from "fumadocs-core/link";
import { TableOfContents, TOCItemType } from "fumadocs-core/server";
import { ChevronLeftIcon } from "lucide-react";
import { PageData } from "../types";
import BreadcrumbParent from "./BreadcrumbParent";
import BreadcrumbLink from "./BreadcrubLink";

export type BreadcrumbProps = {
  parents: TOCItemType[];
  pageData: PageData;
};

export default function Breadcrumb({ parents, pageData }: BreadcrumbProps) {
  return (
    <span className="-md:hidden cant-hover:hidden opacity-0 flex items-center text-3.5 duration-200 group-hover:opacity-100 group-data-[level=h2]:y-0.5 group-data-[level=h3]:y-[1px]">
      {parents.map((parent) => (
        <BreadcrumbLink key={parent.url} url={parent.url}>
          {parent.title}
        </BreadcrumbLink>
      ))}
      <BreadcrumbParent url={pageData.url}>{pageData.title}</BreadcrumbParent>
    </span>
  );
}
