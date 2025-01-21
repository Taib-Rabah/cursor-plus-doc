"use client";

import { createContext, useContext, useState } from "react";

export type TextContext = {
  text: string;
};

const textContext = createContext<TextContext | null>(null);

export function TextProvider({ children, text }: { children: React.ReactNode } & TextContext) {
  return <textContext.Provider value={{ text }}>{children}</textContext.Provider>;
}

export function useTextContext() {
  const context = useContext(textContext);
  if (!context) {
    throw new Error("useTextContext must be used within a TextProvider");
  }
  return context;
}
