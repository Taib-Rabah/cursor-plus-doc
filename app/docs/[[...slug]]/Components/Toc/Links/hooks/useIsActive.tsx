import { TableOfContents } from "fumadocs-core/server";
import { TOCItemType } from "fumadocs-core/server";
import { useCallback } from "react";
import { getParents } from "../../../utils";

export type UseIsActiveProps = {
  activeAnchorId: string | undefined;
  activeAnchor: TOCItemType | undefined;
  toc: TableOfContents;
};

export default function useIsActive({ activeAnchorId, activeAnchor, toc }: UseIsActiveProps) {
  const isActive = useCallback(
    (tocItem: TOCItemType) => {
      if (tocItem.url.slice(1) === activeAnchorId)
        return {
          self: true,
          within: false,
        };
      if (!activeAnchor || activeAnchor.depth <= 2)
        return {
          self: false,
          within: false,
        };

      const parents = getParents({ toc, activeAnchor });

      if (parents.includes(tocItem))
        return {
          self: false,
          within: true,
        };

      return {
        self: false,
        within: false,
      };
    },
    [activeAnchorId, activeAnchor, toc],
  );

  return isActive;
}
