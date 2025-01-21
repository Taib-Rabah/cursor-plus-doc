import Logo from "@/components/Logo";
import { Description, Separator, Title, Actions } from "./components";

export default function HomePage() {
  return (
    <main className="wrapper-sm2 flex-center/col mx-auto flex-1 text-center">
      <Logo />
      <Title />
      <Description />
      <Separator />
      <Actions />
    </main>
  );
}
