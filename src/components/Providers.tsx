"use client";

import { DropdownProvider } from "@/context/DropdownContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DropdownProvider>{children}</DropdownProvider>
    </SessionProvider>
  );
}
