"use client";

import {Fragment, ReactNode} from "react";
import NotificationProvider from "@/providers/notification";
import AuthProvider from "@/providers/auth";
import Header from "@/components/header";

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Fragment>
          <Header />
          <span className="pt-16 w-full">
            {children}
          </span>
        </Fragment>
      </NotificationProvider>
    </AuthProvider>
  );
}
