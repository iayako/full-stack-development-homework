import ingredientPrices from "./ingredient-prices.js"

export default function calcProfit(dish) {
    let ingredientsCost = 0;
    for (let ingredient in dish.ingredients)
        ingredientsCost += ingredientPrices[ingredient];
    dish["cost of products"] = ingredientsCost;
    dish.profit = dish["selling price"] - ingredientsCost;
}