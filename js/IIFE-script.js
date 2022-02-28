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
    getAll: getAll,
  };
})();

let addPokemon = pokemonRepository.add({
  name: "cat",
  height: 0.5,
  strenght: "fire",
});

pokemonRepository.getAll().forEach((pokemon) => {
  console.log(pokemon);
});
