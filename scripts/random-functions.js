'use strict'
let item
let randomRecipes = []
let recipes = getSavedRecipes()

class RandomItem {
    constructor(meal) {
        this.title = meal.title
        this.instructions = meal.instructions
        this.ingredientList = meal.extendedIngredients
        this.displayInstructions = []
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
    extractHTML(html) {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        this.displayInstructions.push(doc.body.textContent || '')
    }
    pushToStorage () {    
        const recipe = {
            title: meal.title,
            ingredients: meal.ingredients,
            instructions: meal.displayInstructions, 
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
    meal.extractHTML(meal.instructions)
    renderRandomRecipe()
 
})

document.querySelector('#save-btn').addEventListener('click', (e) => {
    e.preventDefault()
    if (meal){
        meal.pushToStorage()
        saveRecipes(recipes)
    } else {
        alert('You must generate a recipe before saving it!')
    }


})

