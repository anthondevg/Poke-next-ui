// pokemonStore.js
import { create } from "zustand";

const usePokemonStore = create((set) => ({
  currentPokemon: null,
  nextPokemon: null,
  previousPokemon: null,

  setCurrentPokemon: (pokemon: string) => set({ currentPokemon: pokemon }),
  setNextPokemon: (pokemon: string) => set({ nextPokemon: pokemon }),
  setPreviousPokemon: (pokemon: string) => set({ previousPokemon: pokemon }),
}));

export default usePokemonStore;
