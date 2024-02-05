import { cn } from "@/utilities/cn";
import React from "react";
type Button = {
  onClick?: () => {};
  children: React.ReactNode;
  className: string;
};

export default function Button({ onClick, children, className }: Button) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-12 md:px-16 py-1 lg:py-3 bg-red-pkn font-bold lg:text-2xl text-white-pkn hover:bg-red-pkn/75 ",
        className
      )}
    >
      {children}
    </button>
  );
}
