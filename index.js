const searchBtn= document.getElementById('searchBtn');
const mealList= document.getElementById('meal');
const mealDetailsContent= document.querySelector('.meal-details-content');
const recipeCloseBtn= document.getElementById('recipeCloseBtn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', ()=>{
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList(){
  let searchInputText= document.getElementById('searchInput').value.trim();
  // console.log(searchInputText);
  let url=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
  fetch(url)
  .then((response)=>{
    return response.json()
  }).then((data)=> {
    console.log(data);
    showList(data);
  });
  
}

function showList(data){
  if(data.meals){
    let template="";
    data.meals.forEach(element=>{
      
      template += `
        <div class="meal-item" data-id="${element.idMeal}">
          <div class="meal-img">
            <img src="${element.strMealThumb}" alt="${element.strMeal}">
        </div>
        <div class="meal-name">
          <h3>${element.strMeal}</h3>
          <a href="#" class="recipe-btn")">Get Recipe</a>
        </div>
      </div>
      `;
      mealList.innerHTML= template;

    });
    meal.classList.remove('notfound');
  }
  else{
    template= "Sorry, We didn't find any meal! Try Again";
    mealList.innerHTML= template;
    mealList.classList.add('notfound');

  }
}

function getMealRecipe(e){
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
    let mealItem= e.target.parentElement.parentElement;
    console.log(mealItem);
    const url= `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`;
    fetch(url)
    .then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      mealRecipeModal(data.meals);
    });
  }
}

function mealRecipeModal(meal){
  console.log(meal);
  meal= meal[0];
  let template= `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instructions">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video Tutorial</a>
    </div>
  `;
  mealDetailsContent.innerHTML= template;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}