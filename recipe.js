// BACK BUTTON
function goHome() {
  window.location.href = "index.html";
}

// GET ID FROM URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// LOAD RECIPE
async function loadRecipe() {

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await res.json();
  const meal = data.meals[0];

  let ingredients = "";

  // COLLECT INGREDIENTS
  for (let i = 1; i <= 20; i++) {
    if (meal["strIngredient" + i]) {
      ingredients += `
        <li>${meal["strIngredient" + i]}</li>
      `;
    }
  }

  // DISPLAY RECIPE
  document.getElementById("recipeDetails").innerHTML = `
    <div class="recipe-card">

      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

      <h2>${meal.strMeal}</h2>

      <p class="recipe-area">${meal.strArea}</p>

      <h3>Ingredients</h3>
      <ul>${ingredients}</ul>

      <h3>Instructions</h3>
      <p class="instructions">${meal.strInstructions}</p>

    </div>
  `;
}

// CALL FUNCTION
loadRecipe();
