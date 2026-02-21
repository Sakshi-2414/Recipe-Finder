const id =
new URLSearchParams(window.location.search)
.get("id");


async function loadRecipe(){

const res = await fetch(
`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
);

const data = await res.json();

const meal = data.meals[0];


let ingredients="";

for(let i=1;i<=20;i++){

if(meal["strIngredient"+i]){

ingredients+=`
<li>
${meal["strIngredient"+i]}
</li>
`;

}

}


document.getElementById("recipeDetails")
.innerHTML=`

<div class="recipe-card">

<img src="${meal.strMealThumb}">

<h2>${meal.strMeal}</h2>

<p>${meal.strArea}</p>

<h3>Ingredients</h3>

<ul>${ingredients}</ul>

<h3>Instructions</h3>

<p>${meal.strInstructions}</p>

</div>

`;

}


loadRecipe();