"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import { getPokemonType, getSprite } from "@/utilities/formatters";
import { PokemonCardsProps } from "@/models/Pokemon";

export default function PokemonCard({ pokemonUrl }: PokemonCardsProps) {
  const [pokemon, setPokemon] = useState({} as any);

  useEffect(() => {
    fetch(pokemonUrl)
      .then((res) => res.json())
      .then((pokemon) => {
        console.log(pokemon);
        setPokemon(pokemon);
      });
  }, []);

  return (
    <>
      {pokemon.sprites ? (
        <div className="lg:w-72 z-0 ">
          <Link href={"/pokedex/1"}>
            <Card
              borderColor={getPokemonType(pokemon)}
              hp={pokemon.stats[0].base_stat}
            >
              <img src={getSprite(pokemon)} className="w-36 mt-4 h-36 m-auto" />
              <div className="text-center">
                <p className="text-stroke-3-white text-3xl font-black text-center w-full capitalize">
                  {pokemon.name}
                </p>
                <p className="font-bold bg-gradient-to-b from-white to-slate-900/5 inline-block text-transparent bg-clip-text">
                  Type {getPokemonType(pokemon)}
                </p>
              </div>

              <div className="z-10 mt-4">
                <div className="flex font-bold justify-between">
                  <p>Ataque Rapido</p> <p>90</p>
                </div>
                <div className="flex z-50 font-bold justify-between">
                  <p>Ataque Rapido</p> <p>90</p>
                </div>
                <div className="flex font-bold justify-between">
                  <p>Ataque Rapido</p> <p>90</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      ) : (
        <div>Loading :D...</div>
      )}
    </>
  );
}
