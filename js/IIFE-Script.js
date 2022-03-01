let pokemonRepository = (function () {
  let pokemonList = []; // create empty array
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20"; // api URL we are fetching from

  // fetchs all pokemons that are in the array
  function getAll() {
    return pokemonList;
  }

  // adds a new pokemon to the array
  function add(item) {
    pokemonList.push(item);
  }

  // This function creates a new pokemon to display on the html
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let divName = document.createElement("div");
    divName.innerText = pokemon.name;
    divName.classList.add("pokemon__name");
    listPokemon.appendChild(divName);
    pokemonList.appendChild(listPokemon);

    let detailButton = document.createElement("button");
    detailButton.classList.add("pokemon__details");
    detailButton.innerText = "Click for details";
    pokemonList.appendChild(detailButton);

    detailButton.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  // This function is a promise, it grabs the pokemons from the api and puts them into the array we made.
  async function loadList() {
    try {
      const response = await fetch(apiUrl);
      const json = await response.json();
      json.results.forEach((item) => {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    } catch (e) {
      console.error(e);
    }
  }

  // This function fetches the details from the pokemon.
  async function loadDetails(item) {
    let url = item.detailsUrl;
    try {
      const response = await fetch(url);
      const details = await response.json();
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    } catch (e) {
      return console.error(e);
    }
  }

  // This function makes the details show in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(() => {
      console.log(pokemon);
    });
  }

  // Here we return all functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();


pokemonRepository.loadList().then(function () { // first we load the list
  pokemonRepository.getAll().forEach((pokemon) => { // then we grab all pokemons
    pokemonRepository.addListItem(pokemon); // and put them all to the DOM
  });
});
