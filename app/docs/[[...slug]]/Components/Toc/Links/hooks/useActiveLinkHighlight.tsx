import { useEffect } from "react";

export type UseActiveLinkHighlightProps = {
  activeAnchorId: string | undefined;
  linksDivRef: React.RefObject<HTMLDivElement | null>;
  linksRef: React.RefObject<Record<string, HTMLAnchorElement>>;
};

export default function useActiveLinkHighlight({
  activeAnchorId,
  linksDivRef,
  linksRef,
}: UseActiveLinkHighlightProps) {
  useEffect(() => {
    if (!activeAnchorId) return;

    const linksDiv = linksDivRef.current;
    if (!linksDiv) return;

    const activeLink = linksRef.current[activeAnchorId];
    if (!activeLink) return;

    setTimeout(() => {
      const activeLinkRect = activeLink.getBoundingClientRect();
      const linksDivRect = linksDiv.getBoundingClientRect();

      const y = activeLinkRect.top - linksDivRect.top;
      linksDiv.style.setProperty("--y", `${y}px`);
    }, 200);
  });
}
