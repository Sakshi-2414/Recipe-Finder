// ELEMENTS

const recipesDiv = document.getElementById("recipes");
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const vegToggle = document.getElementById("vegToggle");


// LOAD DEFAULT

window.onload = loadDefaultRecipes;



async function loadDefaultRecipes(){

  recipesDiv.innerHTML = "Loading...";

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );

  const data = await res.json();

  displayMeals(data.meals.slice(0,6));

}



// LOAD VEG

async function loadVegRecipes(){

  recipesDiv.innerHTML = "Loading Veg...";

  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
  );

  const data = await res.json();


  const meals = await Promise.all(

    data.meals.slice(0,6).map(async meal=>{

      const res2 = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );

      const d2 = await res2.json();

      return d2.meals[0];

    })

  );

  displayMeals(meals);

}



// SEARCH

searchBtn.onclick = searchRecipes;

input.addEventListener("keypress", e=>{

  if(e.key==="Enter") searchRecipes();

});



async function searchRecipes(){

  const query = input.value.trim();

  if(!query){

    vegToggle.checked
    ? loadVegRecipes()
    : loadDefaultRecipes();

    return;
  }


  recipesDiv.innerHTML="Searching...";


  const res = await fetch(

    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`

  );

  const data = await res.json();

  if(!data.meals){

    recipesDiv.innerHTML="No recipes found";

    return;
  }


  let meals = await Promise.all(

    data.meals.slice(0,12).map(async meal=>{

      const res2 = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );

      const d2 = await res2.json();

      return d2.meals[0];

    })

  );


  if(vegToggle.checked){

    meals = meals.filter(meal=>
      meal.strCategory==="Vegetarian"
    );

  }


  displayMeals(meals.slice(0,6));

}



// DISPLAY

function displayMeals(meals){

  recipesDiv.innerHTML="";

  meals.forEach(meal=>{

    recipesDiv.innerHTML+=`

      <div class="recipe-card">

        <img src="${meal.strMealThumb}">

        <h3>${meal.strMeal}</h3>

        <p>${meal.strArea} Cuisine</p>

        <a href="recipe.html?id=${meal.idMeal}">
          View Recipe
        </a>

      </div>

    `;

  });

}



// TOGGLE

vegToggle.onchange=()=>{

  input.value
  ? searchRecipes()
  : vegToggle.checked
    ? loadVegRecipes()
    : loadDefaultRecipes();

};