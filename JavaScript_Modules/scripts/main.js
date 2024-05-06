import calcProfit from "./calc-profit-func.js";
import { buuza, wok, pizza } from "./dishes.js";

buuza.profit = calcProfit(buuza.ingredients, buuza["selling price"], ingredientPrices);
wok.profit = calcProfit(wok.ingredients, wok["selling price"], ingredientPrices);
pizza.profit = calcProfit(pizza.ingredients, pizza["selling price"], ingredientPrices);
let menu = [buuza, wok, pizza];
for (let dish in menu)
    alert(menu[dish].profit);