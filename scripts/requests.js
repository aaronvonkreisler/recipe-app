
const summaryEl = document.querySelector('#summary')
const titleEl = document.querySelector('#title')
const imageEl = document.querySelector('#image')
const instructionEl = document.querySelector('#instructions')
const ingredientEl = document.querySelector('#ingredients')


const getRandomRecipe = async () => {
    const response = await fetch('https://api.spoonacular.com/recipes/random?apiKey=4e63c9c0fe79413f8cb4ed0a2c7b4cd4&number=1')

    if (response.status === 200) {
        const data = await response.json()
        return data.recipes[0]
    } else {
        throw new Error('Error with API Request')
    }
}



const renderRecipe = async () => {
    const meal = await getRandomRecipe()
    const summaryText = document.createElement('p')
    const title = document.createElement('h2')
    const img = document.createElement('img')
    const instructions = document.createElement('p')

    //Clear whats already there
    imageEl.innerHTML = ''
    titleEl.innerHTML = ''
    summaryEl.innerHTML = ''
    instructionEl.innerHTML = ''
    ingredientEl.innerHTML = ''
    //Set content
    img.src = meal.image
    title.textContent = meal.title
    summaryText.innerHTML = meal.summary
    instructions.innerHTML = meal.instructions

    meal.extendedIngredients.forEach((ingredient) => {
        ingredientEl.appendChild(generateIngredients(ingredient))
    })

    imageEl.appendChild(img)
    titleEl.appendChild(title)
    summaryEl.appendChild(summaryText)
    instructionEl.appendChild(instructions)


}


document.querySelector('#generate-btn').addEventListener('click', renderRecipe)


const generateIngredients = (ingredient) => {
     
        const listItem = document.createElement('li')
       
        const textEl = document.createElement('p')

        // Set up element calsses

        textEl.classList.add('text-left')
        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'font-italic')
       
    
        textEl.textContent = ingredient.original.toLowerCase()
    
        //Set up checkbox and add event listener
        


        listItem.appendChild(textEl)
        
    
        return listItem
    }




//summary items

//meal.readyInMinutes - number will need to .toString()
//meal.servings - number