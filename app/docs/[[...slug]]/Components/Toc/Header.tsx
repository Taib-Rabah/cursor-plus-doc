import { AlignLeftIcon, SettingsIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/shadcn-ui/popover";
import { Switch } from "@/components/shadcn-ui/switch";
import { Label } from "@/components/shadcn-ui/label";
import { useLocalStorage } from "@/hooks";
import { useTocContext } from "./Provider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn-ui/tooltip";
import { Button } from "@/components/shadcn-ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/shadcn-ui/select";
import Title from "./Title";
import Separator from "./Separator";
import Settings from "./Settings";

export default function Header() {
  

  return (
    <div className="flex items-center">
      <Title />
      <Separator />
      <Settings />
    </div>
  );
}
