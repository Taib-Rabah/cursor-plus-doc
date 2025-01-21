import { RootProvider } from "fumadocs-ui/provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RootProvider>{children}</RootProvider>;
}
