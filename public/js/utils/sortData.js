const sortData = (recipes) => {
	let ingredients = [];
	let items = [];
	let ustensils = [];
	recipes.forEach((recipe) => {
		ingredients = [...new Set([...ingredients, ...recipe.ingredients.map((i) => i.ingredient)])].sort();
		ustensils = [...new Set([...ustensils, ...recipe.ustensils.map((u) => u)])].sort();
		items = [...new Set([...items, ...[recipe.appliance]])].sort();     
	});
	return { ingredients, ustensils, items };
}

export {    
    sortData
}