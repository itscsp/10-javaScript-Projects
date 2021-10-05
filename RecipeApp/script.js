
getRandomMeal();

fetchFavMeals();


// TO GET RANDOM MEAL DATA
async function getRandomMeal(){
  const APIURL = "https://www.themealdb.com/api/json/v1/1/random.php"
  const resp = await fetch(APIURL);

  const respData = await resp.json();
  const rondomMeal  = respData.meals[0];

  console.log(rondomMeal);

  addMeal(rondomMeal, true);

}

//TO GET MEAL BY id
async function getMealById(id){
  const APIURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id
  const resp = await fetch(APIURL);

  const respData = await resp.json();
  const meal  = respData.meals[0];


  return meal;

}


// TO DSIPLAY RANDOM MEALS IN SCREEN


function addMeal(mealData, rondom = false){
  const meal = document.createElement('div');
  meal.classList.add('meal');



  meal.innerHTML = `
    <div class="meal-header">
        ${rondom ? `
          <span class="random">
              Random Recipe
          </span>
        ` : ""}

        <span class="heart">
            <i class="fa-heart far"></i>
        </span>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" >
    </div>
    <div class="meal-body">
        <h4>${mealData.strMeal}</h4>

    </div>
  `;

  meals.appendChild(meal);

  const btn = meal.querySelector(".meal-header .heart .fa-heart");
  btn.addEventListener("click", (e) => {

    e.target.classList.toggle("far");
    e.target.classList.toggle("fas")

    if(btn.classList.contains('fas')){
      addMealToLS(mealData.idMeal)
      fetchFavMeals();
    }else{
      removeMealFromLS(mealData.idMeal)
    }

  })

}

// to store favirate food

function addMealToLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));

}

function removeMealFromLS(mealId) {
  const mealIds = getMealsFromLS();

  localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));

}

function getMealsFromLS(){
  const mealIds = JSON.parse(localStorage.getItem('mealIds'));
  return mealIds === null ? [] : mealIds;

}

//end of the store favirate food

// To get Fav Meal Info
async function fetchFavMeals() {
  const mealIds = getMealsFromLS();

  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const meal = await getMealById(mealId);

    addMealToFav(meal);
  }

  // Add Then To Screen

}

