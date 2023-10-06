function getPokemonType(pokemon: any) {
  return pokemon.types[0].type.name;
}
function getSprite(pokemon: any) {
  return pokemon["sprites"]["other"]["official-artwork"]["front_default"];
}
export { getPokemonType, getSprite };
