/* eslint-disable react/display-name */

import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { source } from "lib/source";
import { notFound } from "next/navigation";
import { Enum, Heading, Toc, VideoByKey } from "./Components";
import { HeadingLevel } from "./Components/Heading/types";
import Link from "fumadocs-core/link";
import { CopyText, CopyTextRef } from "@/components/ui/CopyText";
import CopyUrl from "./Components/Heading/CopyUrl";
import Separator from "./Components/Heading/Separator";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";

type Page = Exclude<ReturnType<typeof source.getPage>, undefined>;

const createHeadingCreator =
  (page: Page) => (as: HeadingLevel) => (props: { children: React.ReactNode; id: string }) => (
    <Heading
      {...props}
      as={as}
      pageData={{ title: page.data.title, url: page.url, toc: page.data.toc }}
    />
  );

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const createHeading = createHeadingCreator(page);

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        component: <Toc toc={page.data.toc} />,
      }}
      article={{
        className: "max-w-[940px]",
      }}
    >
      <DocsTitle className="group flex items-center">
        <Link href={page.url}>{page.data.title}</Link>
        <Separator />
        <CopyUrl relativeUrl={page.url} />
      </DocsTitle>
      {page.data.hideDescription ? null : (
        <DocsDescription>{page.data.description}</DocsDescription>
      )}
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            VideoByKey,
            img: ImageZoom,
            Image: ImageZoom,
            h1: createHeading("h1"),
            h2: createHeading("h2"),
            h3: createHeading("h3"),
            h4: createHeading("h4"),
            h5: createHeading("h5"),
            h6: createHeading("h6"),
            Enum,
            Link,
            CopyText,
            CopyTextRef,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
