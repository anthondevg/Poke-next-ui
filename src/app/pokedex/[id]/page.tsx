"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import uuid from "react-uuid";
import { useFetchPokeApi } from "@/hooks/pokeapi";
import { Jockey_One } from "next/font/google";
import Stat from "../components/Stat";
import Sprite from "../components/Sprite";
import PokeType from "@/components/PokeType";
import { getSprite } from "@/utilities/formatters";

const Jockey = Jockey_One({ subsets: ["latin"], weight: "400" });

export default function Page() {
  const params = useParams();
  const [is3d, setIs3d] = useState(false);
  const { pokemon, isFetching } = useFetchPokeApi(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );

  if (isFetching) return <div className="text-2xl "></div>;

  return (
    <main className=" bg-gradient-to-b h-screen   gap-6 grow m-auto px-2 lg:px-12 relative">
      <section className="flex flex-col justify-center m-auto pt-12 items-center">
        <h3
          className={`text-[#CFCFCF] z-50 text-7xl lg:text-9xl  uppercase font-black ${Jockey.className}`}
        >
          {pokemon.name}
        </h3>
        <h3
          className={` text-[#CFCFCF]/30 text-7xl lg:text-9xl -mb-28 lg:-mb-72 uppercase font-black ${Jockey.className}`}
        >
          {pokemon.name}
        </h3>

        {is3d ? (
          <img
            src={pokemon.sprites && pokemon.sprites.other.home.front_default}
            className="w-72  z-50"
            alt="pokemon 3d image"
          />
        ) : (
          <img
            src={pokemon.sprites && getSprite(pokemon)}
            className="w-72  z-50"
          />
        )}
      </section>

      <div className="max-w-4xl m-auto">
        <section className="bg-slate-800 border-4 -mt-14 px-8 space-y-5 lg:px-16 pt-16 rounded-xl p-4 mx-4 text-black relative">
          <button
            className="p-2 px-4 rounded-md font-bold absolute -top-16 right-0  border-4 z-50 text-gray-500 "
            onClick={() => setIs3d(!is3d)}
          >
            {is3d ? "2D" : "3D"}
          </button>
          <h2 className="text-sm text-slate-300  font-bold absolute top-4 right-4">
            # 000{pokemon.id}
          </h2>
          <h2 className="text-2xl text-slate-500  font-bold">Stats</h2>
          <section className="grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 grid">
            {pokemon.stats &&
              pokemon.stats
                .slice(0, 4)
                .map((stat: any) => (
                  <Stat
                    key={stat.stat.name || uuid()}
                    name={stat.stat.name}
                    value={stat.base_stat}
                  />
                ))}
            <Stat name="Height" value={pokemon.height} />
            <Stat name="Weight" value={pokemon.weight} />
          </section>
          <h2 className="text-2xl text-slate-500  font-bold mb-4">Types</h2>
          <div className="flex gap-4">
            {pokemon.types &&
              pokemon.types.map((pokemon: any) => (
                <PokeType key={uuid()} type={pokemon.type.name} />
              ))}
          </div>
          <h2 className="text-2xl text-slate-500  font-bold mb-4">Sprites</h2>
          {pokemon.sprites && (
            <div className="flex">
              <Sprite sprite={pokemon.sprites.front_default} />
              <Sprite sprite={pokemon.sprites.back_default} />
              <Sprite sprite={pokemon.sprites.front_shiny} />
              <Sprite sprite={pokemon.sprites.back_shiny} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
