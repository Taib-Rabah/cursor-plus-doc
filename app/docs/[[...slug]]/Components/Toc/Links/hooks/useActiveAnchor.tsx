import { TableOfContents } from "fumadocs-core/server";
import { useActiveAnchor as useFumaActiveAnchor } from "fumadocs-core/toc";

export type UseActiveAnchorProps = {
  toc: TableOfContents;
};

export default function useActiveAnchor({ toc }: UseActiveAnchorProps) {
  const activeAnchorId = useFumaActiveAnchor();
  const activeAnchor = toc.find((item) => item.url.slice(1) === activeAnchorId);

  return { activeAnchorId, activeAnchor };
}
