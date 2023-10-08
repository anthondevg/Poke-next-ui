import Navbar from "@/components/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-gradient-to-b to-black from-dark-pkn">
      <Navbar />
      {children}
    </section>
  );
}
