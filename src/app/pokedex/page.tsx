import React from "react";
import PokemonCard from "@/components/Card/PokemonCard";
import Searchbar from "./components/Searchbar";
import Navbar from "@/components/Navbar";
// import { getServerSession } from "next-auth";
// import { options } from "../api/auth/[...nextauth]/options";
import { PokemonRef } from "@/models/Pokemon";

export default async function Page() {
  //const session = await getServerSession(options);

  const pokemons = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=10"
  )
    .then((res) => res.json())
    .then((data: any) => data.results);

  return (
    <section className="bg-gradient-to-b to-[#1d1d1d] from-black">
      <Navbar />

      <main className="p-4 px-6 max-w-7xl m-auto pb-72">
        <Searchbar />

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-6">
          {pokemons.length &&
            pokemons.map((pokemonRef: PokemonRef) => (
              <PokemonCard key={pokemonRef.name} pokemonUrl={pokemonRef.url} />
            ))}
        </div>
      </main>
    </section>
  );
}
