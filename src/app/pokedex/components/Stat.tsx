import { cn } from "@/utilities/cn";
import React from "react";
type StatType = {
  name: string;
  value: string;
  className?: string;
};
export default function Stat({ name, value, className }: StatType) {
  return (
    <div
      className={cn(
        `flex justify-between  rounded-xl p-4 bg-gradient-to-r bg-slate-900 `,
        className
      )}
    >
      <h3 className="text-2xl text-slate-500 capitalize  font-bold">{name}</h3>
      <h3 className="text-2xl text-slate-400 font-bold">{value}</h3>
    </div>
  );
}
