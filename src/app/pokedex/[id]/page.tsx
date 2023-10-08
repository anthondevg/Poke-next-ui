"use client";
import React from "react";
import { useParams } from "next/navigation";
import PokemonCard from "@/components/Card/PokemonCard";
import uuid from "react-uuid";
import { useFetchPokeApi } from "@/hooks/pokeapi";
import { formatMoveName } from "@/utilities/formatters";

export default function Page() {
  const params = useParams();

  const { pokemon, isFetching } = useFetchPokeApi(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );

  if (isFetching) return <div className="text-2xl text-white">Cargando...</div>;

  return (
    <main className=" bg-white-pkn w-[1200px] flex justify-center gap-6 grow m-auto px-2 lg:px-12 mt-12">
      <PokemonCard
        pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${params.id}`}
        key={uuid()}
        className=""
      />
    </main>
  );
}
