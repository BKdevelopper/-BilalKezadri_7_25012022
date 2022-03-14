const noResult = (resultSection) => {
    resultSection.append(
        createDom(
            "div",
            `Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.`,
            { class: "no__results" }
        )
    );
}

export {
    noResult
}