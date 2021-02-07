const searchBtn = document.getElementById('searchBtn');
const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        });
};
const renderFoodInfo = food => {
    const foodDetailsDiv = document.getElementById('foodsDetails');

    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4 class="food-name">${food.strMeal}</h4>
    
    <ul class="list-unstyled mb-0">
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient1}- ${food.strMeasure1}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient2}- ${food.strMeasure2}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient3}- ${food.strMeasure3}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient4}- ${food.strMeasure4}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient5}- ${food.strMeasure5}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient6}- ${food.strMeasure6}</li>
        <li><i class="fas fa-check-square"></i>  ${food.strIngredient8}- ${food.strMeasure7},</li>
    </ul>

`;
};
const data_container = document.getElementById('foods');
function foodclass(mealId) {
    const listApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(listApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
            console.log(data.meals)
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
            foods.map(food => {
                const foodsection = document.createElement('div');
                foodsection.className = 'col-md-3 ';
                const foodarray = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-pill" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>                       
                    `;
                foodsection.innerHTML = foodarray;
                foodsDiv.appendChild(foodsection);
            });
         
        
    };
}
const erClass = document.getElementById('errorClass');
searchBtn.addEventListener('click', function () {
    const inputtext = document.getElementById('exceptional').value;
    data_container.innerHTML = '';
    if (inputtext === '' || inputtext.length > 1 ) {
        alert("Input must be a single character")
        erClass.style.display = 'block';
    } else {
        foodclass(inputtext);
        erClass.style.display = 'none';
    }
});

