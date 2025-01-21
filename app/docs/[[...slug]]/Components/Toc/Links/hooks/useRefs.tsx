import { useCallback, useRef } from "react";

export default function useRefs() {
  const linksDivRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Record<string, HTMLAnchorElement>>({});

  const addLinkRef = useCallback(
    (url: string) => (el: HTMLAnchorElement | null) => {
      if (!el) {
        delete linksRef.current[url];
        return;
      }
      linksRef.current[url] = el;
    },
    []
  );

  return { linksDivRef, linksRef, addLinkRef };
}
