import { cn } from "@/lib/utils";
import Link from "fumadocs-core/link";
import { TableOfContents, TOCItemType } from "fumadocs-core/server";
import { depthTw } from "./data";
import { useActiveAnchor, useActiveLinkHighlight, useRefs, useIsActive } from "./hooks";
import { Arr } from "@trdev20/js-utils";

export type LinksProps = {
  toc: TableOfContents;
};

export default function Links({ toc }: LinksProps) {
  const { linksDivRef, linksRef, addLinkRef } = useRefs();

  const { activeAnchorId, activeAnchor } = useActiveAnchor({ toc });

  useActiveLinkHighlight({ activeAnchorId, linksDivRef, linksRef });

  const isActive = useIsActive({ activeAnchorId, activeAnchor, toc });

  const links = toc.reduce(
    (data, curr) => {
      if (curr.depth === 3) {
        data.shouldNest = true;
        data.links.push({ parent: curr, children: [] });
        return data;
      }
      if (curr.depth < 3) {
        data.shouldNest = false;
        data.links.push(curr);
        return data;
      }
      (data.links.at(-1) as { parent: TOCItemType; children: TOCItemType[] }).children.push(curr);
      return data;
    },
    { shouldNest: false, links: [] } as {
      shouldNest: boolean;
      links: (TOCItemType | { parent: TOCItemType; children: TOCItemType[] })[];
    },
  ).links;

  console.log({ links });

  return (
    <div
      ref={linksDivRef}
      className="relative flex flex-col gap-3 text-fd-muted-foreground before:absolute before:-z-10 before:h-full before:w-[2px] before:bg-border after:absolute after:left-0 after:top-[--y] after:h-[21px] after:w-[2px] after:bg-highlight after:duration-300 after:content-empty"
    >
      {toc.map((item) => {
        const isItemActive = isActive(item);

        const className = cn(
          "duration-200 data-active:text-highlight data-active:underline data-[active-within=true]:text-highlight data-[active-within=true]:underline",
          depthTw[item.depth],
        );

        return (
          <Link
            ref={addLinkRef(item.url.slice(1))}
            key={item.url}
            href={item.url}
            data-active={isItemActive.self}
            data-active-within={isItemActive.within}
            className={className}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
