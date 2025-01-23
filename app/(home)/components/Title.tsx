import { EXT_NAME } from "@/lib/constants";

export default function Title() {
  return (
    <h1 className="bu-center mb-8 w-fit text-[3rem] font-bold bu-show/20% bu-blue hover:bu-show peer-hover:bu-show light:text-blue">
      {EXT_NAME}
    </h1>
  );
}
