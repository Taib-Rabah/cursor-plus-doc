import Link from "fumadocs-core/link";
import { ChevronLeftIcon } from "lucide-react";

export type BreadcrumbLinkProps = {
  url: string;
  children: React.ReactNode;
};

export default function BreadcrumbLink({ url, children }: BreadcrumbLinkProps) {
  return (
    <Link href={url} className="inline-flex items-center Text-black/white text-opacity-60 no-underline">
      <ChevronLeftIcon className="mx-1 size-4 stroke-[3]" />
      {children}
    </Link>
  );
}
