"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import uuid from "react-uuid";
import { useFetchPokeApi } from "@/hooks/pokeapi";
import { Jockey_One } from "next/font/google";
import Stat from "../components/Stat";
import Sprite from "../components/Sprite";
import PokeType from "@/components/PokeType";
import { getSprite } from "@/utilities/formatters";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import PokemonCard from "@/components/Card/PokemonCard";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const { pokemon, isFetching } = useFetchPokeApi(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const x = useMotionValue(0);

  useMotionValueEvent(x, "change", (latest) => {
    console.log(latest);

    if (latest > 30) {
      router.push(`/pokedex/${pokemon.id + 1}`);
    }

    if (latest < -50) {
      if (pokemon.id == 1) return;
      router.push(`/pokedex/${pokemon.id - 1}`);
    }
  });

  if (isFetching) return <div className="text-2xl "></div>;
  const animationProps = {
    y: [0, 20, 0], // Animate along the y-axis from 0 to 100 and back to 0
    transition: { duration: 3, repeat: Infinity }, // Loop indefinitely
  };
  return (
    <main className="bg-gradient-to-b overflow-x-hidden pb-6 gap-6 grow items-center m-auto relative">
      <section className="flex flex-col justify-center m-auto lg:pt-12 items-center">
        {/* <PokemonCard
          pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`}
          className="absolute top-2 -left-10 w-60 z-0"
        /> */}
        <motion.div
          className="px-8 space-y-5 lg:px-16 pt-16 rounded-xl p-4 cursor-pointer mx-4 text-black relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          style={{ x }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <motion.div
            animate={{ y: 10 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            whileTap={{ scale: 0.9 }}
            className="z-50"
          >
            <h3
              className={`text-[#CFCFCF] z-50 text-7xl lg:text-9xl  capitalize font-black `}
            >
              {pokemon.name}
            </h3>
            <h3
              className={` text-[#CFCFCF]/5 text-7xl lg:text-9xl -mb-32 lg:-mb-72 capitalize font-black `}
            >
              {pokemon.name}
            </h3>

            <motion.div animate={animationProps}>
              <img
                src={pokemon.sprites && getSprite(pokemon)}
                className="lg:w-96 w-44 mx-auto z-50"
              />
            </motion.div>

            <div className="px-1 mt-6 py-1 bg-slate-700 rounded-full w-44 mx-auto">
              <div className=" bg-slate-950 w-5 h-5 mx-auto rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
        {/* <PokemonCard
          pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`}
          className="absolute top-2 -right-10 w-60 z-0"
        /> */}
      </section>

      <div className="max-w-4xl m-auto px-12">
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
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Sprite sprite={pokemon.sprites.front_default} />
            <Sprite sprite={pokemon.sprites.back_default} />
            <Sprite sprite={pokemon.sprites.front_shiny} />
            <Sprite sprite={pokemon.sprites.back_shiny} />
          </div>
        )}
      </div>
    </main>
  );
}
