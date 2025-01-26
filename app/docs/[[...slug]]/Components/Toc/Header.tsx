import Title from "./Title";
import Separator from "./Separator";
import Settings from "./Settings";

export default function Header() {
  return (
    <div className="flex items-center">
      <Title />
      <Separator />
      <Settings />
    </div>
  );
}
