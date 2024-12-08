import "@/styles/globals.css";
import {Fragment, ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {cn} from "@/utils/theme";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "First Things First",
  description:
    "First Things First is a task management platform that prioritizes tasks intelligently using methods like MoSCoW, RICE, and Kano Model. Organize your backlog efficiently and stay focused on what matters most.",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="pt-br">
      <body
        className={cn(
          inter.className,
          "max-w-screen bg-[#E0E1DD] bg-fixed bg-no-repeat flex"
        )}
      >
        <Fragment>
          {children}
        </Fragment>
      </body>
    </html>
  );
}
