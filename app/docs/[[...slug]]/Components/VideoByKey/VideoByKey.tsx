import data, { AvailableVideo } from "@/data";
import { StringChoices } from "@trdev20/js-utils";
import { ComponentProps } from "react";

export type VideoProps = ComponentProps<"video"> & {
  vKey: AvailableVideo;
};

export default function VideoByKey({ vKey }: VideoProps) {
  const src = data.video[vKey];
  return <video src={src} controls />;
}

