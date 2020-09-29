const createIngredients = (recipeId, text) => {
    // const recipes = getSavedRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    
    recipe.ingredients.push({
        text: text,
        inStock: false,
        id: uuidv4()
    })
    saveRecipes()
}

const renderIngredients = (recipeId) => {
    const ingredientsList =  document.querySelector('#ingredient-list')
    // const recipes = getSavedRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredients = recipe.ingredients

    ingredientsList.innerHTML = ''

    if (ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsList.appendChild(generateIngredientsDOM(ingredient))
        })
    } else {
        const messageEl = document.createElement('div')
        messageEl.classList.add('alert', 'alert-primary')
        messageEl.textContent = 'No ingredients to show... Add some now!'

        ingredientsList.appendChild(messageEl)
    }
   saveRecipes(recipes)  
}

const generateIngredientsDOM = (ingredient) => {
    const checkBox = document.createElement('input')
    const listItem = document.createElement('li')
    const removeEl = document.createElement('span')
    const textEl = document.createElement('p')
    const div = document.createElement('div')
    const div2 = document.createElement('div')

    // Set up element calsses
    div.classList.add('input-group-prepend')
    div2.classList.add('input-group-text')
    textEl.classList.add('text-left')
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'font-italic')
    removeEl.classList.add('badge', 'badge-danger','badge-pill', 'btn')

    textEl.textContent = ingredient.text.toLowerCase()

    //Set up checkbox and add event listener
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = ingredient.inStock
    checkBox.addEventListener('change', () => {
        toggleIngredient(ingredient.id, recipe.id)
        saveRecipes(recipes)
        renderIngredients(recipe.id)
    })

    // Set up the remove button w/ event listener
    removeEl.textContent = 'Remove'
    removeEl.addEventListener('click',() => {
       
        removeIngredient(ingredient.id, recipe.id)
        renderIngredients(recipe.id)
    })
    
    div2.appendChild(checkBox)
    div.appendChild(div2)
    listItem.appendChild(div)
    listItem.appendChild(textEl)
    listItem.appendChild(removeEl)

    return listItem
}

const toggleIngredient = (id, recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredients = recipe.ingredients
    const ingredientItem = ingredients.find((ingredient) => ingredient.id === id)
    if(ingredientItem) {
        ingredientItem.inStock = !ingredientItem.inStock
    }
}

const removeIngredient = (id, recipeId) => {
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredients = recipe.ingredients
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id)
    
    if (ingredientIndex > -1) {
         ingredients.splice(ingredientIndex, 1)
    }
}



