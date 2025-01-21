import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn-ui/popover";
import { Switch } from "@/components/shadcn-ui/switch";
import { Label } from "@/components/shadcn-ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/shadcn-ui/select";

import { SettingsIcon } from "lucide-react";
import { useTocContext } from "../Provider";

export default function Settings() {
  const {
    tocAutoExpandState: [tocAutoExpand, setTocAutoExpand],
    tocExpandDepthState: [tocExpandDepth, setTocExpandDepth],
  } = useTocContext();

  const toggleTocAutoExpand = () => setTocAutoExpand((prev) => !prev);
  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SettingsIcon className="size-[20px] text-fd-muted-foreground" />
                <span className="sr-only">Customize the table of contents</span>
              </div>
            </TooltipTrigger>
            <TooltipContent asChild sideOffset={7}>
              <span className="bg-zinc-800 text-white">TOC Settings</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent className="mt-4 w-fit b-2 b-highlight" side="left">
        <p className="text-sm font-medium text-fd-muted-foreground">
          Customize the table of contents
        </p>
        <hr className="mb-4 mt-2 b-highlight/40" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Label htmlFor="auto-expand">Auto expand:</Label>
              <Switch
                id="auto-expand"
                checked={tocAutoExpand}
                onCheckedChange={toggleTocAutoExpand}
                className="data-[state=checked]:bg-highlight data-[state=unchecked]:bg-fd-muted-foreground"
              />
            </div>
            <p className="max-w-[40ch] text-sm text-fd-muted-foreground">
              Expand all links by default
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Label htmlFor="expand-depth">Expand depth:</Label>
              <Select
                onValueChange={(value) => setTocExpandDepth(Number(value) + 1)}
                value={(tocExpandDepth - 1).toString()}
              >
                <SelectTrigger className="w-fit gap-1 px-2">
                  <SelectValue placeholder="Select depth" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="max-w-[40ch] text-sm text-fd-muted-foreground">
              Links deeper than this value will be collapsed
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
