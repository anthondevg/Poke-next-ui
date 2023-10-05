"use client";
import React from "react";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/pokedex");
    },
  });

  return (
    <div>
      Pokedex Dashboard {session?.user?.name}{" "}
      <Button onClick={signOut}>Cerrar sesion</Button>
    </div>
  );
}
