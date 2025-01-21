import { TableOfContents } from "fumadocs-core/server";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type PageData = {
  title: string;
  url: string;
  toc: TableOfContents;
};