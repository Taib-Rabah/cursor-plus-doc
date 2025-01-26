"use client";

import { TOCItemType } from "fumadocs-core/server";
import { PageData } from "../types";
import BreadcrumbParent from "./BreadcrumbParent";
import BreadcrumbLink from "./BreadcrubLink";

export type BreadcrumbProps = {
  parents: TOCItemType[];
  pageData: PageData;
};

export default function Breadcrumb({ parents, pageData }: BreadcrumbProps) {
  return (
    <span className="flex items-center text-3.5 opacity-0 duration-200 group-hover:opacity-100 group-data-[level=h2]:y-0.5 group-data-[level=h3]:y-[1px] cant-hover:hidden -md:hidden">
      {parents.map((parent) => (
        <BreadcrumbLink key={parent.url} url={parent.url}>
          {parent.title}
        </BreadcrumbLink>
      ))}
      <BreadcrumbParent url={pageData.url}>{pageData.title}</BreadcrumbParent>
    </span>
  );
}
