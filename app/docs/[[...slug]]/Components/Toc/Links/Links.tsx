import { cn } from "@/lib/utils";
import Link from "fumadocs-core/link";
import { TableOfContents, TOCItemType } from "fumadocs-core/server";
import { depthTw } from "./data";
import { useActiveAnchor, useActiveLinkHighlight, useRefs, useIsActive } from "./hooks";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useTocContext } from "../Provider";

export type LinksProps = {
  toc: TableOfContents;
};

export default function Links({ toc }: LinksProps) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [manuallyExpanded, setManuallyExpanded] = useState<string[]>([]);

  const {
    tocAutoExpandState: [tocAutoExpand],
    tocExpandDepthState: [tocExpandDepth],
  } = useTocContext();

  const { linksDivRef, linksRef, addLinkRef } = useRefs();

  const { activeAnchorId, activeAnchor } = useActiveAnchor({ toc });

  useActiveLinkHighlight({ activeAnchorId, linksDivRef, linksRef });

  const isActive = useIsActive({ activeAnchorId, activeAnchor, toc });

  useEffect(() => {
    if (tocAutoExpand) {
      setManuallyExpanded(
        toc.filter((item) => item.depth === tocExpandDepth).map((item) => item.url),
      );
    } else {
      setManuallyExpanded([]);
    }
  }, [tocAutoExpand, toc, tocExpandDepth]);

  useEffect(() => {
    if (!activeAnchor) return;

    if (activeAnchor.depth < tocExpandDepth) {
      setExpanded([]);
      return;
    }

    if (activeAnchor.depth === tocExpandDepth) {
      setExpanded([activeAnchor.url]);
      return;
    }

    const parent = toc
      .slice(0, toc.indexOf(activeAnchor))
      .findLast((item) => item.depth === tocExpandDepth);
    if (!parent) return;

    setExpanded([parent.url]);
  }, [activeAnchor, toc, tocExpandDepth]);

  const links = toc.reduce(
    (data, curr) => {
      if (curr.depth === tocExpandDepth) {
        data.shouldNest = true;
        data.links.push({ parent: curr, children: [] });
        return data;
      }
      if (curr.depth < tocExpandDepth) {
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

  const twLink =
    "duration-200 data-active:text-highlight data-active:underline data-[active-within=true]:text-highlight data-[active-within=true]:underline";

  const expandHandler = (url: string) => () => {
    if (expanded.includes(url)) return;

    if (manuallyExpanded.includes(url)) {
      setManuallyExpanded((prev) => prev.filter((item) => item !== url));
    } else {
      setManuallyExpanded((prev) => [...prev, url]);
    }
  };

  // links.filter(item => "parent" in item).map(item => item.)

  return (
    <div
      ref={linksDivRef}
      className="relative flex flex-col gap-3 text-fd-muted-foreground before:absolute before:-z-10 before:h-full before:w-[2px] before:bg-border after:absolute after:left-0 after:top-[--y] after:h-[21px] after:w-[2px] after:bg-highlight after:duration-300 after:content-empty"
    >
      {links.map((item) => {
        if (!("parent" in item)) {
          const isItemActive = isActive(item);

          const className = cn(twLink, depthTw[item.depth]);
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
        } else {
          const isItemActive = isActive(item.parent);
          const className = cn(twLink, depthTw[item.parent.depth]);
          return (
            <div
              key={item.parent.url}
              className="group"
              data-expanded={
                manuallyExpanded.includes(item.parent.url) || expanded.includes(item.parent.url)
              }
            >
              <div className="flex items-center gap-1">
                <Link
                  ref={addLinkRef(item.parent.url.slice(1))}
                  href={item.parent.url}
                  data-active={isItemActive.self}
                  data-active-within={isItemActive.within}
                  className={className}
                >
                  {item.parent.title}
                </Link>
                {item.children.length ? (
                  <button
                    disabled={expanded.includes(item.parent.url)}
                    className="group/button px-1 duration-200 disabled:cursor-not-allowed group-data-expanded:rotate-180"
                    onClick={expandHandler(item.parent.url)}
                  >
                    <ChevronDown className="size-4 duration-200 hover:text-white group-disabled/button:text-white" />
                    <span className="sr-only">Toggle menu</span>
                  </button>
                ) : null}
              </div>
              {item.children.length ? (
                <div className="grid grid-rows-[0fr] duration-200 group-data-expanded:grid-rows-[1fr]">
                  <div className="flex flex-col gap-3 overflow-hidden duration-200 group-data-expanded:mt-3">
                    {item.children.map((item) => {
                      const isItemActive = isActive(item);

                      const className = cn(twLink, depthTw[item.depth]);
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
                </div>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
}
