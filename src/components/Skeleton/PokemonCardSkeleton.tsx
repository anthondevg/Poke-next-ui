import React from "react";

export default function PokemonCardSkeleton() {
  return (
    <div
      className={`rounded-xl animate-pulse shadow-lg relative p-6  bg-gradient-to-b from-black to-zinc-900`}
    >
      <div className="flex justify-between">
        <div
          className={`h-6 w-6 lg:w-6 lg:h-6 rounded-full mb-4 z-50 bg-gray-800/50 shadow-xl`}
        ></div>
      </div>

      <div className="w-full bg-gray-900/20 h-52 rounded-xl p-4"></div>
    </div>
  );
}
