import calcProfit from "./calc-profit-func.js";
import { buuza, wok, pizza } from "./dishes.js";

calcProfit(buuza);
alert(buuza.profit);
calcProfit(wok);
alert(wok.profit);
calcProfit(pizza);
alert(pizza.profit);