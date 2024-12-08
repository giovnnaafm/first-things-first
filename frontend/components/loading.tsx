import {Loader2} from "lucide-react";
import {Fragment, ReactNode} from "react";

import {cn} from "@/utils/theme";

interface LoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

export default function Loading({children, isLoading}: LoadingProps) {
  return isLoading ? (
    <aside
      className={cn(
        "relative flex h-full w-full self-center items-center justify-center  p-8  "
      )}
    >
      <Loader2 className="z-10 h-8 w-8 animate-spin text-primary" />
    </aside>
  ) : (
    <Fragment>
      {children}
    </Fragment>
  );
}
