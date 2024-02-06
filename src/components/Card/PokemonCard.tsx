"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import {
  formatMoveName,
  getPokemonType,
  getSprite,
} from "@/utilities/formatters";
import { PokemonCardsProps } from "@/models/Pokemon";
import { cn } from "@/utilities/cn";
import uuid from "react-uuid";
import { useFetchPokeApi } from "@/hooks/pokeapi";
import { motion } from "framer-motion";
import PokemonCardSkeleton from "../Skeleton/PokemonCardSkeleton";

export default function PokemonCard({
  pokemonUrl,
  className,
}: PokemonCardsProps) {
  const { pokemon, isFetching } = useFetchPokeApi(pokemonUrl);

  if (isFetching) return <PokemonCardSkeleton />;
  if (!pokemon.sprites) return;
  return (
    <div className={cn("grid-flow-row", className)}>
      <Link href={`/pokedex/${pokemon.name}`}>
        <motion.div
          animate={{ y: 10 }}
          whileHover={{ y: -2, shadow: "20px 10px 2px rgba(0, 0, 0, 1)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Card
            borderColor={getPokemonType(pokemon)}
            hp={pokemon.stats[0].base_stat}
            className={className}
          >
            <img src={getSprite(pokemon)} className="w-36 mt-4 h-36 m-auto" />

            <div className="text-center">
              <p className="text-stroke-3-white text-3xl lg:text-3xl font-black text-center w-full capitalize">
                {pokemon.name}
              </p>

              <p className="font-bold bg-gradient-to-b lg:text-xl mt-2 from-white to-gray-50 inline-block text-transparent bg-clip-text">
                Type {getPokemonType(pokemon)}
              </p>
            </div>

            <div className="z-10 mt-4">
              <div className="flex flex-col pl-4">
                {pokemon.abilities.map((ability: any) => {
                  return (
                    <div
                      key={uuid()}
                      className="flex flex-col text-sm text-gray-50"
                    >
                      <p>{formatMoveName(ability.ability.name)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </div>
  );
}
