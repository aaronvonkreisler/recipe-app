'use strict'
let item
let randomRecipes = []
let recipes = getSavedRecipes()

class RandomItem {
    constructor(meal) {
        this.title = meal.title
        this.instructions = meal.instructions
        this.ingredientList = meal.extendedIngredients
        this.image = meal.image
        this.summary = meal.summary
        this.ingredients = []
        this.diet = []
        this.time = []
        this.allergens = []
        
    }
    extractIngredients() {
        this.ingredientList.forEach((item) => {
            this.ingredients.push({
                text: item.original,
                inStock: false,
                id: uuidv4()
            })
        })

    }
    pushToStorage () {    
        const recipe = {
            title: meal.title,
            ingredients: meal.ingredients,
            instructions: meal.instructions, 
            diet: [],
            time: [],
            allergens: [],
            id: uuidv4()

        }
        recipes.push(recipe)
    }
}

document.querySelector('#generate-btn').addEventListener('click', async () => {
    const newItem = await getRandomRecipe()
    meal = new RandomItem(newItem)
    meal.extractIngredients()
    renderRandomRecipe()
 
})

document.querySelector('#save-btn').addEventListener('click', (e) => {
    e.preventDefault()
    meal.pushToStorage()
    saveRecipes(recipes)

})

