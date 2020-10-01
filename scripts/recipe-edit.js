'use strict'
const titleElement = document.querySelector('#recipe-name')
const instructionsElement = document.querySelector('#instruction-area')
const ingredientList = document.querySelector('#ingredient-list')
const dietTypeElement = document.querySelector('#diet-type')
const cookTimeElement = document.querySelector('#cook-time')
const allergensElement = document.querySelector('#allergens')
let recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)



let recipe = recipes.find((recipe) => recipe.id === recipeId)

const ingredients = recipes.ingredients

if (!recipe) {
    location.assign('/index.html') 
}

titleElement.value = recipe.title
instructionsElement.value = recipe.instructions 
ingredientList.value = recipe.ingredients
dietTypeElement.value = recipe.diet
cookTimeElement.value = recipe.time
allergensElement.value = recipe.allergens

titleElement.addEventListener('input', (e) => {
    recipe.title = e.target.value
    saveRecipes(recipes)
})

instructionsElement.addEventListener('input', (e) => {
    recipe.instructions = e.target.value 
    saveRecipes(recipes)
   
})


window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        recipes = JSON.parse(e.newValue)
        recipe = recipes.find((recipe) => recipe.id === recipeId)

        if(!recipe) {
            location.assign('/index.html')
        }
        titleElement.value = recipe.title
        instructionsElement.value = recipe.instructions
        ingredientList.value = recipe.ingredients
        dietTypeElement.value = recipe.diet
        cookTimeElement.value = recipe.time
        allergensElement.value = recipe.allergens
        
    }
})


document.querySelector('#delete-button').addEventListener('click',() => {
    deleteRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign('/index.html')
})

document.querySelector('#add-item').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim(' ')   
        e.preventDefault()
 
        if(text.length > 0){
            createIngredients(recipeId, text) 
            e.target.elements.text.value = ''
        }  
        renderIngredients(recipeId)    
})

dietTypeElement.addEventListener('change', (e) => {
    if(recipe.diet.length > -1){
        recipe.diet.splice(0, 1)
    }
    recipe.diet.push(e.target.value)
    $('.toast').toast('show')
    saveRecipes(recipes)
})

cookTimeElement.addEventListener('change', (e) => {
    if (recipe.time.length > -1){
        recipe.time.splice(0, 1)
    }

    recipe.time.push(e.target.value)
    $('.toast').toast('show')
    saveRecipes(recipes)
})


allergensElement.addEventListener('change', (e) => {
    if(recipe.allergens.length > -1){
        recipe.allergens.splice(0,1)
    }
    recipe.allergens.push(e.target.value)

    $('.toast').toast('show')
    saveRecipes(recipes)
    
})

renderIngredients(recipeId)