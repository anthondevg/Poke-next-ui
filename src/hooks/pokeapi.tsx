import { useEffect } from "react";
import { useState } from "react";

const useFetchPokeApi = (pokemonUrl: string) => {
  const [pokemon, setPokemon] = useState({} as any);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);

    fetch(pokemonUrl)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsFetching(false);
      });
  }, []);

  return { pokemon, isFetching, setPokemon };
};

export { useFetchPokeApi };
