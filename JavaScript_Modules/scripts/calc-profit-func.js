import ingredientPrices from "./ingredient-prices.js"

export default function calcProfit(ingredients, selling_price, ingredientsPrices) {
    let ingredientsCost = 0;
    for (let ingredientInfo in ingredients) {
        let ingredient = ingredients[ingredientInfo];
        ingredientsCost += ingredientsPrices[ingredient.name] * ingredient.amount;
    }
    return selling_price - ingredientsCost;
}