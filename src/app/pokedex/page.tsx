"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/pokedex");
    },
  });

  return <div>Pokedex Dashboard {session?.user?.name}</div>;
}
