"use client";

import { useTextContext } from "./Provider";

export default function CopyTextRef() {
  const { text } = useTextContext();

  return text;
}
