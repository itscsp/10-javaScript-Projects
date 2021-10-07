
getRandomMeal();

const mealsEl = document.getElementById('meals')
const FavContainer = document.getElementById('fav-meals')


const searchTerm = document.getElementById("searchTerm")
const searchBtn = document.getElementById("search")

const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('closePopup') 

const mealInfoEL = document.getElementById("meal-info");


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

//GET MEAL BY SEARCH
async function getMealBySearch(term) {
  const APIURL = "https://www.themealdb.com/api/json/v1/1/search.php?s="+term
  const resp = await fetch(APIURL);

  const respData = await resp.json();
  const meals = respData.meals;

  return meals;
}


// TO DSIPLAY RANDOM MEALS IN SCREEN


function addMeal(mealData, rondom = false){
  const meal = document.createElement('div');
  meal.classList.add('meal');



  meal.innerHTML = `
    <div class="meal-body">
      <div class="title">
        <h4>${mealData.strMeal}</h4>
		<button id="show">Show Recipe</buttton>
      </div>

    </div>
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

  `;
  
  meal.addEventListener("click", () => {
	  showMealInfo(mealData)
  })

   mealsEl.appendChild(meal);

  // showbtn[0].addEventListener("click", () => {
  //   const recipePara = document.querySelector(".recipe");
  //   recipePara.classList.remove('d-none');

  //   const box = document.querySelector('.recipe-intra');

  //   const height = box.offsetHeight;

  //   recipePara.style.height = height;




  // })


  const btn = meal.querySelector(".meal-header .heart .fa-heart");
  btn.addEventListener("click", (e) => {

    e.target.classList.toggle("far");
    e.target.classList.toggle("fas")

    if(btn.classList.contains('fas')){
      addMealToLS(mealData.idMeal)

    }else{
      removeMealFromLS(mealData.idMeal)
    }


    fetchFavMeals()


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

  if(mealIds){
    mealIds.reverse()
  }

  return mealIds === null ? [] : mealIds;

}

//end of the store favirate food

// To get Fav Meal Info
async function fetchFavMeals() {

  //clear the container
  FavContainer.innerHTML = '';

  const mealIds = getMealsFromLS();

  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    const meal = await getMealById(mealId);

    addMealToFav(meal);
  }

  // Add Then To Screen

}



// DISPLAY MEALS IN FAV LIST
function addMealToFav(mealData){
  const FavMeal = document.createElement('li');




  FavMeal.innerHTML = `

    <img
    src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    <span class="fav-meal-name">${mealData.strMeal}</span>
    <button class="clear"><i class="fas fa-times-circle"></i></button>

  `;

  const btn = FavMeal.querySelector('.clear');

  btn.addEventListener('click', () => {
    removeMealFromLS(mealData.idMeal);

    fetchFavMeals()
  })
  
  FavMeal.addEventListener("click", () => {
	  showMealInfo(mealData)
  })


  FavContainer.appendChild(FavMeal);

}


// SEARCH FUNCTIONALITY

searchBtn.addEventListener('click', async() => {
  mealsEl.innerHTML = '';
  const search = searchTerm.value;
  const meals = await getMealBySearch(search);

  if(meals){

    meals.forEach((meal) => {
      addMeal(meal);
    })
  }

})


popupCloseBtn.addEventListener('click', () => {
	mealPopup.classList.add('hidden')
});


function showMealInfo(mealData){
	
	//clean at first
	mealInfoEL.innerHTML = '';
	
	//update the Meal Info
	const mealEl = document.createElement('div');
	
	const ingredient = [];
	// get ingredient and measure
		
	for(let i =1; i <= 20; i++){
		if(mealData['strIngredient'+i]){
			ingredient.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
		}else{
			break;
		}
	}
	
	console.log(ingredient);
	
	mealEl.innerHTML = `
		<h3>${mealData.strMeal}</h3>
		<img src="${mealData.strMealThumb}" alt="">
	
	
		<p>${mealData.strInstructions}</p>
		<h3>Ingredients</h3>
		
		<ul>
			${ingredient.map(
				(ing) => `
				<li>${ing}</li>
				`
				)
				.join("")}
		</ul>
	`
	
	mealInfoEL.appendChild(mealEl);
	
	//show popUp
	mealPopup.classList.remove('hidden')
}