import { Button } from "components/shadcn-ui/button";
import { BookIcon, DownloadIcon } from "lucide-react";
import Link from "fumadocs-core/link";

export default function Actions() {
  return (
    <div className="flex justify-center gap-4">
      <Button asChild>
        <Link href="/docs">
          Get Started <BookIcon />
        </Link>
      </Button>
      <Button variant={"outline"} asChild>
        <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=TRDev20.cursor-plus">
          Install <DownloadIcon />
        </a>
      </Button>
    </div>
  );
}
