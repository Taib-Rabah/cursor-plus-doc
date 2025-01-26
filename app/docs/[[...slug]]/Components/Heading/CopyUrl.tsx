"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { useRef } from "react";

export type CopyUrlProps = {
  relativeUrl: string;
  id?: string;
};

export default function CopyUrl({ relativeUrl, id }: CopyUrlProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleCopy = () => {
    const url = `${window.location.origin}${relativeUrl}${id ? `#${id}` : ""}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);

    clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200} disableHoverableContent>
        <TooltipTrigger
          onClick={handleCopy}
          className="hover:bg-fd-secondary-background Text-black/white flex h-8 items-center gap-2 rounded bg-fd-background p-2 px-2 py-2 text-3.5 text-opacity-70 duration-200 group-hover:opacity-100 can-hover:opacity-0 cant-hover:px-3"
        >
          <div className="absolute-with-grid">
            <CheckIcon
              data-visible={isCopied}
              className="size-3.5 rotate-[360deg] scale-0 opacity-0 duration-400 [animation:400ms_cubic-bezier(.98,-0.93,0,1.63),400ms_cubic-bezier(.38,.11,.02,1.01)] data-visible:rotate-0 data-visible:scale-100 data-visible:opacity-100"
            />
            <CopyIcon
              data-visible={!isCopied}
              className="size-3.5 rotate-[360deg] scale-0 opacity-0 duration-400 [animation:400ms_cubic-bezier(.98,-0.93,0,1.63),400ms_cubic-bezier(.38,.11,.02,1.01)] data-visible:rotate-0 data-visible:scale-100 data-visible:opacity-100"
            />
          </div>
          <span className="sr-only text-3">Copy URL</span>
        </TooltipTrigger>
        <TooltipContent asChild sideOffset={7}>
          <span className="bg-zinc-800 text-white cant-hover:hidden">Copy URL</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
