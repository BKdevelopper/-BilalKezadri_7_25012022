let IngredientsBox = (jsonData) => {
    const DataIngredient = jsonData
    console.log(DataIngredient)
    const Box = document.createElement('div');
    const SectionDiv = document.querySelector('.results')
    Box.classList.add('results-container');
    allBoxIngredients(DataIngredient, Box, SectionDiv)

}

let allBoxIngredients = (DataIngredient, Box,SectionDiv) =>{
    for (const recette of DataIngredient) {
        BoxIngredients(Box, recette, SectionDiv)
    }
}

let BoxIngredients = (Box, element, SectionDiv) => {
    Box.innerHTML += `
    <article class="result">
        <div class="result-picture"></div>
        <div class="result-top">
            <div class="result-top-title">${element.name}</div>
            <div class="result-top-time">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"></path></svg>
                ${element.time} min
            </div>
        </div>
        <div class="result-bottom">
            <div class="result-bottom-ingredients">${insertIngredient(element.ingredients)}</div>
            <div class="result-bottom-recipe">${element.description}</div>
        </div>
    </article>
    `;
    SectionDiv.appendChild(Box)
    return Box
}

let insertIngredient = (allingredient) => { 
    let text =``;  
    for (const ingredient of allingredient) {        
        if (ingredient.quantity) {
            text += `<div class="ingredient"><b>${ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)}:</b>
                ${ingredient.quantity} ${(ingredient.unit) ? ingredient.unit : ''}</div>`;
        } else {
            text += `<div class="ingredient"><b>${ingredient.ingredient}</b></div>`;
        } 
    }
    return text
}

export {
    IngredientsBox
}