"use client";

import {Fragment, ReactNode} from "react";
import NotificationProvider from "@/providers/notification";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <NotificationProvider>
      <Fragment>
        {children}
      </Fragment>
    </NotificationProvider>
  );
}
