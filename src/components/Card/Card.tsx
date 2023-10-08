"use client";

import React, { useEffect, useState } from "react";
import { Aldrich } from "next/font/google";
const AldrichFont = Aldrich({ subsets: ["latin"], weight: "400" });

type CardProps = {
  borderColor: string;
  hp: number;
  children: React.ReactNode;
  className?: string;
};

export default function Card({
  children,
  borderColor,
  hp,
  className,
}: CardProps) {
  const [color, setColor] = useState("");
  // init tailwind classes to be available for the bul
  getPokemonClass("grass", "border");

  useEffect(() => {
    setColor(borderColor);
  }, [borderColor]);

  return (
    <div
      className={`rounded-xl shadow-lg  relative p-3 pb-6 border-4 bg-gradient-to-b from-black to-zinc-900 z-0 ${getPokemonClass(
        color,
        "border"
      )} ${className}`}
    >
      <span
        className={`basicBadge absolute top-2 left-3 text-stroke-3 uppercase px-2 p-0 font-bold text-md lg:text-xl  ${AldrichFont.className}`}
      >
        basic
      </span>
      <div className="flex justify-between">
        <div></div>
        <div className="flex">
          <span className="font-bold text-stroke-3 mr-2 lg:text-xl">
            HP {hp}
          </span>

          <div
            className={`h-6 w-6 lg:w-8 lg:h-8 rounded-full z-50 ${getPokemonClass(
              color,
              "bg"
            )}  shadow-xl`}
          ></div>
        </div>
      </div>
      {children}

      <div className="absolute right-0 bottom-0 -z-10">
        <svg
          width="150"
          height="136"
          viewBox="0 0 96 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M85.2414 0L0 74C19.0345 73.7533 60.0828 73.26 72 73.26C86.069 74 87.7241 71.78 91.8621 68.82C95.1724 66.452 96 61.42 96 59.2V19.24L79.4483 34.78L85.2414 0Z"
            fill="url(#paint0_linear_5_333)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_5_333"
              x1="48"
              y1="0"
              x2="48"
              y2="74"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#282828" />
              <stop offset="0.697917" stopColor="#282828" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function getPokemonClass(pokemonType: string, htmlProperty: string) {
  // we CANNOT build the tailwindCSS classes dinamically
  // for example bg-${colorVariable} won't work, won't exists because
  // tailwind purges all not existing classes at build time.
  const borderColors = {
    bug: "border-orange-300",
    dark: "border-purple-700",
    electric: "border-electric-pkn",
    normal: "border-cyan-pkn",
    grass: "border-grass-pkn",
    poison: "border-purple-500",
    fairy: "border-pink-700",
    fighting: "border-brown-600",
    fire: "border-fire-pkn",
    flying: "border-white",
    ghost: "border-purple-900",
    water: "border-blue-400",
    psychic: "border-pink-500",
    rock: "border-yellow-400",
  } as any;

  const bgColors = {
    bug: "bg-orange-300",
    dark: "bg-purple-700",
    electric: "bg-electric-pkn",
    normal: "bg-cyan-pkn",
    grass: "bg-grass-pkn",
    poison: "bg-purple-500",
    fairy: "bg-pink-700",
    fighting: "bg-brown-600",
    fire: "bg-fire-pkn",
    flying: "bg-white",
    ghost: "bg-purple-900",
    water: "bg-blue-400",
    psychic: "bg-pink-500",
    rock: "bg-yellow-400",
  } as any;

  if (htmlProperty === "border") {
    return `${borderColors[pokemonType]}`;
  } else if (htmlProperty === "bg") {
    return `${bgColors[pokemonType]}`;
  }
}
