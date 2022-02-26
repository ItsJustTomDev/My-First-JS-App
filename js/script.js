let pokemonList = []; // Create a empty array

// Make the pokemon repoistory with the values inside
let pokemonRepo = [
  {
    name: "Ivysaur",
    height: "1 m",
    types: ["grass", "normal", "poison"],
  },
  {
    name: "Charmander",
    height: "0.6 m",
    types: ["steel", "fire", "ice", "pairy"],
  },
  {
    name: "Charmeleon",
    height: "1.1 m",
    types: ["steel", "fire", "ice", "pairy"],
  },
];

// forEach loop to get them item by item pushed into the array
pokemonRepo.forEach((pokemons) => {
  pokemonList.push(pokemons);
});

// loop through all items
for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height == "0.6 m") {
    document.write(
      `${pokemonList[i].name} height (${pokemonList[i].height}) - Fire is cool! <br>` // IF the one of the pokemons heights is 0.6 add THEN this line executes
    );
  } else {
    document.write(
      `${pokemonList[i].name} height (${pokemonList[i].height}) <br>` // otherwise this get executed
    );
  }
}
