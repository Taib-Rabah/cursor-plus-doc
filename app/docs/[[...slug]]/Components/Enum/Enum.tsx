import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn-ui/popover";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

export type EnumProps = {
  children?: React.ReactNode;
  content: React.ReactNode;
  hideIcon?: boolean;
  classNames?: {
    trigger?: string;
    content?: string;
  };
};

export default function Enum({
  children,
  content,
  classNames: userCNs,
  hideIcon = false,
}: EnumProps) {
  const triggerBaseTw = "text-highlight inline-flex items-center gap-1";
  const contentBaseTw = "w-fit py-2 px-3 max-w-100 text-center";

  const triggerClassName = cn(triggerBaseTw, userCNs?.trigger);
  const contentClassName = cn(contentBaseTw, userCNs?.content);

  const defaultTrigger = (
    <>
      Enum <InfoIcon className="size-3.5" />
    </>
  );

  const trigger = (
    <>
      {children}
      {hideIcon ? null : <InfoIcon className="size-3.5" />}
    </>
  );

  return (
    <Popover>
      <PopoverTrigger className={triggerClassName}>
        {children ? trigger : defaultTrigger}
      </PopoverTrigger>
      <PopoverContent className={contentClassName}>{content}</PopoverContent>
    </Popover>
  );
}
