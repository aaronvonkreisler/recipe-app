'use strict'

let recipes = getSavedRecipes()

const filters = {
    title: ''
}


renderRecipes(recipes, filters)

document.querySelector('#search').addEventListener('input', (e) => {
    filters.title = e.target.value
    renderRecipes(recipes, filters)
})

//add new recipe button click listener
document.querySelector('#newItem').addEventListener('click', (e) => {
    const id = uuidv4()
    e.preventDefault()
        recipes.push({
            title: '',
            instructions: '',
            ingredients: [],
            diet:[],
            time: [],
            allergens: [],
            id: id,
            
        })
    saveRecipes(recipes)
    location.assign(`/views/edit.html#${id}`)
})










