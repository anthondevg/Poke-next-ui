function getPokemonType(pokemon: any) {
  return pokemon.types[0].type.name;
}
function getSprite(pokemon: any) {
  return pokemon["sprites"]["other"]["official-artwork"]["front_default"];
}

function formatMoveName(move: string) {
  const words = move.split("-");

  const formmatedMove = words.join(" ");
  return formmatedMove.charAt(0).toUpperCase() + formmatedMove.slice(1);
}
export { getPokemonType, getSprite, formatMoveName };
