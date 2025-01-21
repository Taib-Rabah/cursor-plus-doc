import { TOCItemType } from "fumadocs-core/server";

export type GetParentsProps = {
  toc: TOCItemType[];
  activeAnchor: TOCItemType;
};

export const getParents = ({ toc, activeAnchor }: GetParentsProps) => {
  const activeAnchorIndex = toc.indexOf(activeAnchor);

  const parents = toc.slice(0, activeAnchorIndex).reduceRight(
    (data, curr) => {
      if (curr.depth < data.lastDepth) {
        data.parents.push(curr);
        data.lastDepth = curr.depth;
        return data;
      }
      return data;
    },
    { parents: [] as TOCItemType[], lastDepth: activeAnchor.depth },
  ).parents;

  return parents;
};
