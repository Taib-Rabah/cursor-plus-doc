import Link from "fumadocs-core/link";
import { TOCItemType } from "fumadocs-core/server";
import { createElement } from "react";
import Breadcrumb from "./Breadcrumb";
import CopyUrl from "./CopyUrl";
import Separator from "./Separator";
import { HeadingLevel, PageData } from "./types";

export type HeadingProps = {
  children: React.ReactNode;
  id: string;
  pageData: PageData;
  as: HeadingLevel;
};

export default function Heading({ children, id, as, pageData }: HeadingProps) {
  const { toc } = pageData;

  const anchor = toc.find((item) => item.url.slice(1) === id);
  const anchorIndex = anchor ? toc.indexOf(anchor) : 0;

  const parents = toc.slice(0, anchorIndex).reduceRight(
    (data, curr) => {
      if (curr.depth < data.lastDepth) {
        data.parents.push(curr);
        data.lastDepth = curr.depth;
        return data;
      }
      return data;
    },
    { parents: [] as TOCItemType[], lastDepth: anchor?.depth ?? 0 },
  ).parents;

  return createElement(as, {
    id,
    className: "group cursor-default flex items-center bb-2 pb-1",
    "data-level": as,
    children: (
      <>
        <Link href={`#${id}`} className="inline-flex items-center no-underline">
          {children}
        </Link>
        <Breadcrumb parents={parents} pageData={pageData} />
        <Separator />
        <CopyUrl relativeUrl={pageData.url} id={id} />
      </>
    ),
  });
}
