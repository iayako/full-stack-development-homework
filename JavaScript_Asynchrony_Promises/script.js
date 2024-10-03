async function fetchMenu() {
    const response = await fetch("\menu.json")
    let menu =  await response.json()

    // добавляем в menu массив объектов citiesProfits (профит в каждом городе)
    let citiesProfits = [
        {city: "Moscow", profit: null},
        {city: "Ulan-Ude", profit: null}
    ];
    for (const dish in menu)
        menu[dish].profits = citiesProfits.map(cityProfit => ({...cityProfit}));
    return menu
}

function calcProfitFactory(ingredientsPrices) {
    return function (ingredients, selling_price) {
        let ingredientsCost = ingredients.reduce((sum, item) => sum + ingredientsPrices[item.name] * item.amount, 0)
        return selling_price - ingredientsCost;
    }
}

async function fetchIngredientPrices() {
    const response = await fetch("ingredientsPrices.json"); // Загружаем JSON
    const ingredientsPrices = await response.json(); // Преобразуем ответ в JSON

    // создаём массив объектов calcProfitFuncObj с функциями расчёта профита для каждого города
    let calcProfitFuncObj = [
        { city: "Moscow", func: null },
        { city: "Ulan-Ude", func: null }
    ];

    // Проходим по данным из ingredientsPrices для заполнения массива
    for (const cityObj in ingredientsPrices) {
        let calcProfit = calcProfitFactory(ingredientsPrices[cityObj].prices);
        for (const obj in calcProfitFuncObj) {
            if (calcProfitFuncObj[obj].city === ingredientsPrices[cityObj].city) {
                calcProfitFuncObj[obj].func = calcProfit;
            }
        }
    }

    // Возвращаем calcProfitFuncObj, чтобы использовать дальше
    return calcProfitFuncObj;
}

async function fillMenu() {
    let menu = await fetchMenu();
    let calcProfitFuncObj= await fetchIngredientPrices();
    // заполняем объект profits в зависимости от города принименяем определённую функцию
    for (let dish in menu) {
        for (let cityProfit in menu[dish].profits) {
            for (let cityFunc in calcProfitFuncObj) {
                if (menu[dish].profits[cityProfit].city === calcProfitFuncObj[cityFunc].city) {
                    menu[dish].profits[cityProfit].profit = calcProfitFuncObj[cityFunc].func(menu[dish].ingredients, menu[dish]["selling_price"]);
                }
            }
        }
    }
    return menu;
}

// Задания из JavaScript. Перебирающие методы массивов
async function tasks() {
    let menu = await fillMenu();
// -----------------------------------------------------------
// Используйте `map` , чтобы получить массив с объектами в которых содержится только название и стоимость каждого блюда.
    let shortMenu = menu.map(dish => ({name: dish.name, "selling_price": dish["selling_price"]}))
    console.log(shortMenu);
// -----------------------------------------------------------
// Определите, есть ли в меню хоть одно вегетарианское блюдо, используя `some`.
    let meat = ["chicken fillet", "pork", "ground beef"];
    let isAnyVegetarian = menu.some(dish =>
        !dish.ingredients.some(ingredient =>
            meat.includes(ingredient.name)
        )
    );
    if (isAnyVegetarian) {
        console.log("Есть вегетарианское блюдо");
    } else {
        console.log("Нет вегетарианских блюд");
    }
// -----------------------------------------------------------
// Определите, полностью ли у вас вегетарианское меню с помощью `every`.
    let allVegetarian = menu.every(dish =>
        !dish.ingredients.some(ingredient =>
            meat.includes(ingredient.name)
        )
    );
    if (allVegetarian) {
        console.log("Все блюда вегетарианские");
    } else {
        console.log("Не все блюда вегетарианские");
    }
// -----------------------------------------------------------
// Создайте массив с вегетарианскими блюдами с помощью filter.
    let menuVegetarian = menu.filter(dish =>
        !dish.ingredients.some(ingredient =>
            meat.includes(ingredient.name)
        )
    )
    console.log(menuVegetarian);
}

tasks();
