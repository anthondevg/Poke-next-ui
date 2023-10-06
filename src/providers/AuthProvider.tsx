"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: any }) {
  return <SessionProvider>{children}</SessionProvider>;
}
