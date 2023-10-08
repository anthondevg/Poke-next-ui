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

export default function PokemonCard({
  pokemonUrl,
  className,
}: PokemonCardsProps) {
  const { pokemon, isFetching } = useFetchPokeApi(pokemonUrl);

  if (isFetching) return <div className="text-2xl text-white">Cargando...</div>;
  if (!pokemon.sprites) return;
  return (
    <div className={cn("", className)}>
      <Link href={`/pokedex/${pokemon.name}`}>
        <Card
          borderColor={getPokemonType(pokemon)}
          hp={pokemon.stats[0].base_stat}
          className={className}
        >
          <img src={getSprite(pokemon)} className="w-36 mt-4 h-36 m-auto" />
          <div className="text-center">
            <p className="text-stroke-3-white text-3xl lg:text-[2.2rem] font-black text-center w-full capitalize">
              {pokemon.name}
            </p>
            <p className="font-bold bg-gradient-to-b lg:text-xl mt-2 from-white to-slate-900/5 inline-block text-transparent bg-clip-text">
              Type {getPokemonType(pokemon)}
            </p>
          </div>

          <div className="z-10 mt-4 lg:mt-6 flex justify-evenly">
            <div className="flex items-center flex-col">
              {pokemon.abilities.map((ability: any) => {
                return (
                  <div
                    key={uuid()}
                    className="flex flex-col font-bold text-stroke-3"
                  >
                    <p>{formatMoveName(ability.ability.name)}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center flex-col">
              {pokemon.moves.slice(0, 2).map((move: any) => {
                return (
                  <div
                    key={uuid()}
                    className="flex font-bold text-stroke-3 justify-between"
                  >
                    <p>{formatMoveName(move.move.name)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
