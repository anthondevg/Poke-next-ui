import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return <div className="border-2 border-yellow-300 p-12">{children}</div>;
}
