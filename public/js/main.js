const cocktailDisplay = document.getElementById('cocktail-display');
const btnGetCocktail = document.getElementById('btn-get-cocktail');

btnGetCocktail.addEventListener('click', async () => {
    const response = await fetch('/cocktails/random');
    const data = await response.json();
    const cocktail = data.drinks[0];

    const cocktailHTML = `
        <h4>${cocktail.strDrink}</h4>
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" width="200">
        <p>${cocktail.strInstructions}</p>
    `;
    cocktailDisplay.innerHTML = cocktailHTML;
});
