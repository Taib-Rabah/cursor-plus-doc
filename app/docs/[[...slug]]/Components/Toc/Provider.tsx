import { useLocalStorage } from "@/hooks";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TocContext = {
  tocAutoExpandState: [boolean, Dispatch<SetStateAction<boolean>>];
  tocExpandDepthState: [number, Dispatch<SetStateAction<number>>];
};

export const tocContext = createContext<TocContext | null>(null);

export default function TocProvider({ children }: { children: React.ReactNode }) {
  const [tocAutoExpand, setTocAutoExpand] = useLocalStorage("tocAutoExpand", false);
  const [tocExpandDepth, setTocExpandDepth] = useLocalStorage("tocExpandDepth", 3);

  return (
    <tocContext.Provider
      value={{
        tocAutoExpandState: [tocAutoExpand, setTocAutoExpand],
        tocExpandDepthState: [tocExpandDepth, setTocExpandDepth],
      }}
    >
      {children}
    </tocContext.Provider>
  );
}

export const useTocContext = () => {
  const context = useContext(tocContext);
  if (!context) throw new Error("useTocContext must be used within a TocProvider");
  return context;
};
