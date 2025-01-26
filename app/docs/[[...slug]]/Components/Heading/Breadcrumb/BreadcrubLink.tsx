import Link from "fumadocs-core/link";
import { ChevronLeftIcon } from "lucide-react";

export type BreadcrumbLinkProps = {
  url: string;
  children: React.ReactNode;
};

export default function BreadcrumbLink({ url, children }: BreadcrumbLinkProps) {
  return (
    <Link
      href={url}
      className="Text-black/white inline-flex items-center text-opacity-60 no-underline"
    >
      <ChevronLeftIcon className="mx-1 size-4 stroke-[3]" />
      {children}
    </Link>
  );
}
