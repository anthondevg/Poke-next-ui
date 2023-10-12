import React from "react";
import PokemonCard from "@/components/Card/PokemonCard";
import Searchbar from "./components/Searchbar";
import { PokemonRef } from "@/models/Pokemon";

export default async function Page() {
  //const session = await getServerSession(options);

  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100"
  )
    .then((res) => res.json())
    .then((data: any) => data.results);

  return (
    <main className="p-4 px-6 m-auto pb-72 max-w-[1200px]">
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-6">
        {pokemons.length &&
          pokemons.map((pokemonRef: PokemonRef) => (
            <PokemonCard key={pokemonRef.name} pokemonUrl={pokemonRef.url} />
          ))}
      </div>
    </main>
  );
}
