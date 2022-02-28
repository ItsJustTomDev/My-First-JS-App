let pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  return {
    add: add,
    getAl: getAll,
    pokemonList: pokemonList,
  };
})();

let addPokemon = pokemonRepository.add({
  name: "cat",
  height: 0.5,
  strenght: "fire",
});

pokemonRepository.pokemonList.forEach((pokemon) => {
  console.log(pokemon);
});
