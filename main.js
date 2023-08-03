//https://www.thecocktaildb.com/api.php
const inputCocktailName = document.querySelector("input");
const searchBtn = document.querySelector("button");
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/";
const header = document.querySelector("header");
const heroSection = document.querySelector(".section__hero");
const gallery = document.querySelector(".gallery_section");
const cocktailsContainer = document.querySelector(".cocktails__container");
const clearBtn = document.querySelector(".clear");

const initialCoords = heroSection.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener("scroll", () => {
  if (window.scrollY > initialCoords.top) header.classList.add("sticky");
});

function getCocktail(endpoint, callback) {
  const inputValue = inputCocktailName.value;
  if (inputValue) {
    endpoint = `search.php?s=${inputValue}`;
    const url = `${baseURL}${endpoint}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks === null) {
          alert(
            `No cocktails found for "${inputValue}". Please try search another name.`
          );
        } else {
          callback(data, inputValue);
          console.log(data);
        }
      })
      .catch((error) => alert(error));
  } else {
    alert("Please enter a drink name");
  }
}

function displayData(data) {
  let html = "";
  for (let i = 0; i < data.drinks.length; i++) {
    const ingredients = [];
    for (let j = 1; j <= 15; j++) {
      const ingredient = data.drinks[i][`strIngredient${j}`];
      if (ingredient) {
        ingredients.push(ingredient);
      } else {
        break;
      }
    }

    html += `<article class="cocktail">
      <img class="cocktail__img" src="${data.drinks[i].strDrinkThumb}" />
      <div class="cocktail__data">
        <h3 class="cocktail__name">${data.drinks[i].strDrink}</h3>
        <h4 class="cocktail__category">${data.drinks[i].strCategory}</h4>
        <p class="cocktail_ingredients">${ingredients.join(", ")}</p>
      </div>
    </article>`;
  }
  cocktailsContainer.innerHTML = html;
  gallery.scrollIntoView({ behavior: "smooth" });
}

searchBtn.addEventListener("click", () =>
  getCocktail(`search.php?s=${inputCocktailName.value}`, displayData)
);

clearBtn.addEventListener("click", () => {
  inputCocktailName.value = "";
  cocktailsContainer.innerHTML = "";
});
