import {MuseoModerno} from "next/font/google";
import {cn} from "@/utils/theme";

const museoModerno = MuseoModerno({subsets: ["latin"]});

export default function Logo() {
  return (
    <div
      className={cn(
        museoModerno.className,
        "text-center text-2xl font-bold text-[#44AB53] select-none"
      )}
    >
      First <span className="text-[#0F8BB0]">Things</span> First
    </div>
  );
}
