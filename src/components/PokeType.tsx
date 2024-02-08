import React from "react";

type PokeType = {
  type: string;
};

export default function PokeType({ type }: PokeType) {
  return (
    <span className={`px-4 py-2 bg-red-pkn text-white rounded-md font-bold`}>
      {type}
    </span>
  );
}
