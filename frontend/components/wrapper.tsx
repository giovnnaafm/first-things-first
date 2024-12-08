import {ReactNode} from "react";
import {cn} from "@/utils/theme";
import NotificationProvider from "@/providers/notification";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function Wrapper({className, children}: PageWrapperProps) {
  return (
    <NotificationProvider>
      <section
        className={cn(
          "overflow-auto w-full px-8 self-start flex flex-col items-center justify-center",
          className
        )}
      >
        {children}
      </section>
    </NotificationProvider>
  );
}
