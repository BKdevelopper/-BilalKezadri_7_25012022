import { sortData } from "./sortData.js";
import { recipes } from "../data/recipes.js"
import { IngredientsBox } from "../utils/ingredientsBox.js";
import { noResult } from "./noResult.js";


const tableFilters = [];
const ingredientIcon = document.querySelector(".ingredient__icon");
const ingredientForm = document.querySelector(".ingredient__form");
const ingredientInput = document.querySelector(".ingredient__input");
const ingredientResults = document.querySelector(".ingredient__results");

const itemsIcon = document.querySelector(".items__icon");
const itemsForm = document.querySelector(".items__form");
const itemsInput = document.querySelector(".items__input");
const itemsResults = document.querySelector(".items__results");

const ustensilsIcon = document.querySelector(".ustensils__icon");
const ustensilsForm = document.querySelector(".ustensils__form");
const ustensilsInput = document.querySelector(".ustensils__input");
const ustensilsResults = document.querySelector(".ustensils__results");

const resultSection = document.querySelector(".results");
const Tag = document.querySelector('.tags')
const { ingredients, ustensils, items } = sortData(recipes);

const FormBar = (NameRecipe, Form, FirstResults, FirstIcon, FirstName , SecondIcon, SecondResult, SecondName, ThirdIcon, ThirdResult, ThirdName) => {
    Form.addEventListener("click", () => {
        if (FirstResults.classList.contains(`${FirstName}__results__undisplayed`)) {
            FirstIcon.classList.replace("fa-chevron-down", "fa-chevron-up");        
            SecondIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
            ThirdIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
            FirstResults.classList.replace(`${FirstName}__results__undisplayed`,`${FirstName}__results__displayed`)
            SecondResult.classList.replace(`${SecondName}__results__displayed`, `${SecondName}__results__undisplayed`)
            ThirdResult.classList.replace(`${ThirdName}__results__displayed`, `${ThirdName}__results__undisplayed`)
            SecondResult.innerHTML = "";
            ThirdResult.innerHTML = "";
            NameRecipe.forEach((RecipeResult) => {
                return FirstResults.append(createDom("li", `${RecipeResult}`, { class: `${FirstName}__item` }));
            });
        } else {
            FirstIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
            FirstResults.classList.replace(`${FirstName}__results__displayed`, `${FirstName}__results__undisplayed`)
            FirstResults.innerHTML = "";
        }
        filterTag(FirstName);
    })
}



const SearchBar = (Input, Results, NameRecipe, NameClass) => {
    Input.addEventListener("keyup", (e) => {
        Results.innerHTML = "";
        if (e.target.value.length >= 3) {    
            const value = e.target.value.toLowerCase();            
            const results = NameRecipe.filter((ResultsRecipe) => {
               // console.log(ingredient.toLowerCase().includes(value))// true or false s'il trouve la valeur
                return ResultsRecipe.toLowerCase().includes(value);
            });
            results.forEach((result) => {
                return Results.append(createDom("li", `${result}`, { class: `${NameClass}__item` }));
            });
        }
        filterTag(NameClass);
        
    });
}

const filterTag = (NameClass) => {
    const AllItems = document.querySelectorAll(`.${NameClass}__item`);    
    
    AllItems.forEach((item) => {
        item.addEventListener("click", () => {
            
            Tag.innerHTML = "";          
            tableFilters.push(item.textContent);
            const tableFiltersUnduplicated = [...new Set(tableFilters)];
            console.log(tableFiltersUnduplicated)        
            tableFiltersUnduplicated.forEach((filter) => {
            Tag.append(
                createDom(
                    "span",
                    `${filter}`,
                    { class: `tags-blue` },
                    createDom("i", { class: "fal fa-times-circle filter__query__icon" })
                )
            );
            
           })
           researchTag(recipes)
           
        });
    });
   
   
}

const CloseTag = () => {
    const filterQuery = document.querySelectorAll(".tags-blue");   
    const filters = Array.from(filterQuery);
    console.log(filters)
    filters.forEach((filter) => {
		filter.addEventListener("click", () => {
            const index = filters.indexOf(filter);
            filters.slice(index, 0);
            filter.remove();
            tableFilters.splice(0, tableFilters.length)
            if (!filters.length) {
                resultSection.innerHTML = "";
                IngredientsBox(recipes);
            } else {
                researchTag(recipes);
            }            
		});
	});
}


const researchTag = (recipes) => {
    const filterQuery = document.querySelectorAll(".tags-blue");
    const filters = Array.from(filterQuery);
    const result = recipes.filter((recipe) => {
        return filters.every((item) => {
			const textTag = item.textContent.toLowerCase();
			return (
				recipe.ingredients.some((ingredient) => { return ingredient.ingredient.toLowerCase().includes(textTag);}) ||
				recipe.appliance.toLowerCase().includes(textTag) ||
				recipe.ustensils.some((ustensil) => { return ustensil.toLowerCase().includes(textTag);})
			);
		});
    })
    if (result.length) {
		resultSection.innerHTML = "";
		IngredientsBox(result)
		CloseTag();
	} else if (!result.length) {
		CloseTag();
		resultSection.innerHTML = "";
		noResult(resultSection)
	}
}



FormBar(ingredients,ingredientForm,ingredientResults,ingredientIcon,'ingredient',itemsIcon,itemsResults,'items',ustensilsIcon,ustensilsResults,'ustensils')
FormBar(ustensils,ustensilsForm,ustensilsResults,ustensilsIcon,'ustensils',itemsIcon,itemsResults,'items',ingredientIcon,ingredientResults,'ingredient')
FormBar(items,itemsForm,itemsResults,itemsIcon,'items',ustensilsIcon,ustensilsResults,'ustensils',ingredientIcon,ingredientResults,'ingredient')
SearchBar(ingredientInput,ingredientResults,ingredients,'ingredient')
SearchBar(itemsInput,itemsResults,items,'items')
SearchBar(ustensilsInput,ustensilsResults,ustensils,'ustensils')

