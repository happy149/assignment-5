

function search_food(){
    const foodsearch = document.getElementById('foodsearch').value;
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + foodsearch;
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeals(data.meals));

}

function clear_result(){
    document.getElementById('meals').innerHTML = '';
    document.getElementById('mealDetail').innerHTML = '';
    document.getElementById('mealIngredients').innerHTML = '';

}
const displayMeals = meals =>{
    const mealsDiv =document.getElementById('meals');
    clear_result();
    // if no  meal found
    if(meals === null){
        mealsDiv.innerHTML = '<h3>No meal found!</h3>'
    }
    else{
        console.log('else');
        meals.forEach(meal=> {
            // const country = countries[i];
             const mealDiv = document.createElement('div');
             mealDiv.className = 'meal';
     
             const mealInfo = `
                 <img onclick="displayMealDetails('${meal.idMeal}')" src="${meal.strMealThumb}" />
                 <h3 onclick="displayMealDetails('${meal.idMeal}')" class="meal-name">${meal.strMeal}</h3>

             `
             mealDiv.innerHTML = mealInfo;
     
             mealsDiv.appendChild(mealDiv);
             
         })

    }

    
   
}
const displayMealDetails = idMeal =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    console.log(idMeal);
    fetch(url)
    .then(res=>res.json())
    .then(data=>renderMealInfo(data.meals[0]));
}

const renderMealInfo = meal => {
    const mealDiv = document.getElementById('mealDetail');
    mealDiv.innerHTML = `
        <img src="${meal.strMealThumb}" />
        <h1>${meal.strMeal}</h1>
        <h3>Ingredients</h3>
        `
    const mealIngredients = document.getElementById('mealIngredients');
    mealIngredients.innerHTML = '';
    for(let i=1; i < 21; i ++){
        const div = document.createElement('div');
        const ingredient = meal['strIngredient' + i];
        if(ingredient !== ''){
            console.log(ingredient);
            div.innerHTML = `&#10003; ${ingredient}` ;
            mealIngredients.appendChild(div);
        }
        
    }
}
