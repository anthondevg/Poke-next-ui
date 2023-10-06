"use client";
import Button from "@/components/Button";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutNavbar() {
  return (
    <div>
      <Button onClick={signOut}>Cerrar sesion</Button>
    </div>
  );
}
