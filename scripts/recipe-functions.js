'use strict'

const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes') 
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}


const deleteRecipe = (id) => {
    
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    
    if (recipeIndex > -1) {
         recipes.splice(recipeIndex, 1)
    }
}


const generateRecipeDOM = (recipe) => {
    const card = document.createElement('div')
    const recipeEl = document.createElement('div')
    const textEl = document.createElement('a')
    const dietEl = document.createElement('span')
    const timeEl = document.createElement('span')
    const allergensEl = document.createElement('span')

    textEl.classList.add('flex-grow-1','font-weight-bold')
    card.classList.add('card', 'mb-2')
    recipeEl.classList.add('card-body','d-flex')
    dietEl.classList.add('badge', 'badge-success', 'ml-1', 'align-middle')
    timeEl.classList.add('badge','badge-primary', 'ml-1')
    allergensEl.classList.add('badge', 'badge-warning', 'ml-1')
   
    //setup the recipe title text 
    if(recipe.title.length > 0) {
        textEl.textContent = recipe.title
        
    } else {
        textEl.textContent = 'Unnamed recipe'
    }

    allergensEl.textContent = recipe.allergens
    timeEl.textContent = recipe.time
    dietEl.textContent = recipe.diet
    
    textEl.setAttribute('href', `/views/edit.html#${recipe.id}`)
    recipeEl.appendChild(textEl)
    recipeEl.appendChild(dietEl)
    recipeEl.appendChild(timeEl)
    recipeEl.appendChild(allergensEl)
    card.appendChild(recipeEl)
    
    return card
}

const renderRecipes = (recipes, filters) => {
    const recipeEl = document.querySelector('#recipes')
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(filters.title.toLowerCase())  
    })

    recipeEl.innerHTML = ''

    if(filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            recipeEl.appendChild(generateRecipeDOM(recipe))
        
        })
    } else {
        const messageEl = document.createElement('div')
        messageEl.classList.add('alert', 'alert-primary')
        messageEl.textContent = "No recipes yet? Add your recipes by clicking the 'new recipe' button or generate a random recipe!"
        recipeEl.appendChild(messageEl)

    }

    saveRecipes(recipes)
}


  








