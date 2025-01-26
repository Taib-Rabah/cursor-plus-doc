"use client";

import { TableOfContents } from "fumadocs-core/server";
import Header from "./Header";
import Links from "./Links/Links";
import TocProvider from "./Provider";

export default function Toc({ toc }: { toc: TableOfContents }) {
  return (
    <div className="hidden min-w-[260px] pt-15 text-3.5 xl:block">
      <div className="sticky top-20 flex flex-col gap-4">
        <TocProvider>
          <Header />
          <Links toc={toc} />
        </TocProvider>
      </div>
    </div>
  );
}
