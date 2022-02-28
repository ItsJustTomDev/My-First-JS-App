let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "dog",
      height: 0.2,
      strenght: "water",
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(item) {
    pokemonList.push(item);
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);

    let detailButton = document.createElement("button");
    detailButton.innerText = "Click for details";
    pokemonList.appendChild(detailButton);

    detailButton.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

pokemonRepository.add({
  name: "cat",
  height: 0.5,
  strenght: "fire",
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
