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

  function findPokemon(searchName) {
    $("#pokemon-list").empty();

    pokemonList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())) {
        addListItem(pokemon);
      }
    });
  }

  // This function creates a new pokemon to display on the html
  function addListItem(pokemon) {
    let pokemonList = document.querySelector("#pokemon-list");
    let listPokemon = document.createElement("li");
    let divName = document.createElement("div");

    divName.innerText = pokemon.name;
    divName.classList.add("pokemon__name", "group-list-item");
    listPokemon.appendChild(divName);
    pokemonList.appendChild(listPokemon);

    let detailButton = document.createElement("button");
    detailButton.classList.add("btn", "btn-secondary");
    detailButton.innerText = "Click for details";
    pokemonList.appendChild(detailButton);

    detailButton.setAttribute("data-toggle", "modal");
    detailButton.setAttribute("data-target", "#pokemonModal");

    modelToggle(detailButton, pokemon);
  }

  function modelToggle(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");

    // Clear preexisting content
    modalTitle.empty();
    modalBody.empty();

    // Adding pokemon name as Title
    let titleElement = $("<h1>" + pokemon.name + "</h1>");
    modalTitle.append(titleElement);

    // Creating elements for the modalBody
    // 1. image
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = pokemon.imageUrl;

    // 2. Height
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    // 3. weight
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");

    // 4. Types
    let typesElement = $(
      '<p class="text-capitalize">' +
        "Types: " +
        pokemon.types.join(", ") +
        "</p>"
    );

    // Appending elements to modalBody
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  // This function is a promise, it grabs the pokemons from the api and puts them into the array we made.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function fetches the details from the pokemon.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
        details.types.forEach(function (element) {
          item.types.push(element.type.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This function makes the details show in the console
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Here we return all functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    findPokemon: findPokemon,
  };
})();

pokemonRepository.loadList().then(function () {
  // first we load the list
  pokemonRepository.getAll().forEach((pokemon) => {
    // then we grab all pokemons
    pokemonRepository.addListItem(pokemon); // and put them all to the do
  });
});
