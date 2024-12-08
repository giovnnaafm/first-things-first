import {cn} from "@/utils/theme";

interface TitleProps {
  title: string;
  className?: string;
}
export default function Title({title, className}: TitleProps) {
  return (
    <h1 className={cn(className, `text-center py-8 text-3xl font-bold text-primary`)}>
      {title}
    </h1>
  );
}
