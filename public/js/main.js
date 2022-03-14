import { recipes } from "./data/recipes.js"
import { IngredientsBox } from "./utils/IngredientsBox.js"
import { noResult } from "./utils/noResult.js";

const resultSection = document.querySelector(".results");
const InputSearchBar = document.querySelector(".search-control"); 


class RecipeForBox {
    constructor(data) {
        this.name = data.name;
        this.time = data.time;
        this.description = data.description;       
        this.ingredients = [];
        data.ingredients.forEach( (ingredient) => this.ingredients.push(new Ingredient(ingredient)));
    }
}

class Ingredient {
    constructor(data) {
        this.ingredient = data.ingredient.toLowerCase();
        if (data.quantity) this.quantity = data.quantity;
        if (data.unit) this.unit = data.unit;
    }
}


const Algo1 = (recipes, input) => {
	let TabRecipe = [];
	for (const recipe of recipes) {
		TabRecipe.push(new RecipeForBox(recipe))
	}
	const results = TabRecipe.filter((recipe) => {
		return (
			recipe.name.includes(input) || 
			recipe.description.includes(input) || 
			recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(input))
		);
	});
	return results
}

const searchBarResults = (recipes, searchBar) => {
	searchBar.addEventListener("keyup", (e) => {
		if (e.target.value.length >= 3) {	
			resultSection.innerHTML=""		
			const query = e.target.value.toLowerCase();		
			const results = Algo1(recipes, query)
			IngredientsBox(results)
			
			if (!results.length) {
				noResult(resultSection)
			}
		} else if (e.target.value.length <= 3) {
			resultSection.innerHTML = "";
			IngredientsBox(recipes);
		}
		 
	});
};

searchBarResults(recipes,InputSearchBar)

