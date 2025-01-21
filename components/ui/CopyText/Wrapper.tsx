"use client";

import { cn } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef, useState } from "react";
import { TextProvider } from "./Provider";
import Text from "./Text";

export type CopyTextProps = {
  children?: React.ReactNode;
  text: string;
  code?: boolean;
  className?: string;
};

const baseTw =
  "data-copied:au-show au-right/hide bu-center inline-flex items-center au-highlight bu-border has-[button:hover]:au-show";

export default function CopyText({ children, className: userCN, text, code }: CopyTextProps) {
  const [isCopied, setIsCopied] = useState(false);

  const resetCopiedTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const className = cn(baseTw, userCN);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    clearTimeout(resetCopiedTimeoutRef.current);

    resetCopiedTimeoutRef.current = setTimeout(() => {
      setIsCopied(false);
      resetCopiedTimeoutRef.current = undefined;
    }, 2000);
  };

  return (
    <TextProvider text={text}>
      <span data-copied={isCopied} className={className}>
        {code ? (
          <code>{children ?? text}</code>
        ) : (
          <span className="font-mono">{children ?? text}</span>
        )}
        <button onClick={copyText} className="absolute-with-grid">
          <span className="sr-only">Copy Text</span>
          <CheckIcon
            data-visible={isCopied}
            className="easing-[cubic-bezier(.98,-0.93,0,1.63)] ml-2 mr-1 size-3.5 rotate-[360deg] scale-0 opacity-0 duration-400 data-visible:rotate-0 data-visible:scale-100 data-visible:opacity-100"
          />
          <CopyIcon
            data-visible={!isCopied}
            className="easing-[cubic-bezier(.98,-0.93,0,1.63)] ml-2 mr-1 size-3.5 rotate-[360deg] scale-0 opacity-0 duration-400 data-visible:rotate-0 data-visible:scale-100 data-visible:opacity-100"
          />
        </button>
      </span>
    </TextProvider>
  );
}
