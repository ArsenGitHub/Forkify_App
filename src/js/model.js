// Forkify API
import { API_URL, KEY } from './config';
// Fetch helper
import { AJAX } from './helpers';
// Кол-во рецептов на страницу
import { ITEMS_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    results: [],
    itemsPerPage: ITEMS_PER_PAGE,
  },
  bookmarks: [],
};

// Запрос рецептов по поиску
export const loadSearchResults = async function (dish) {
  try {
    // Задаем страницу здесь, чтобы при повторном поиске(запросе данных) нумерация начиналась заного
    state.search.currentPage = 1;
    // Сохраняем блюдо из поиска
    state.search.dish = dish;
    // Запрашиваем данные рецептов на основе блюда из инпута
    const data = await AJAX(`${API_URL}?search=${dish}&key=${KEY}`);
    // Общее количество страниц необходимое для отображаения рецептов
    state.search.totalPages = Math.ceil(
      data.data.recipes.length / state.search.itemsPerPage
    );

    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

// Ф-я переформатирования св-в обьекта
const formatObjectData = function (dataObj) {
  const { recipe } = dataObj.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

// Запрос данных рецепта из Forkify API
export const loadRecipe = async function (recipeId) {
  try {
    const data = await AJAX(API_URL + recipeId);
    // Переформатируем св-ва обьекта
    state.recipe = formatObjectData(data);
    // Есть ли рецепт в закладках
    state.recipe.bookmarked = state.bookmarks.some(
      (bookmarkedRecipe) => bookmarkedRecipe.id === recipeId
    );
  } catch (err) {
    throw err;
  }
};

// Ф-я для разделения данных по страницам
export const getSearchDataPart = function (page = state.search.currentPage) {
  // Сохраняем страницу в обьекте, которая будет приходить из UI
  state.search.currentPage = page;

  // Возвращаем данные пришедшие из API по частям для разделения на страницы
  return state.search.results.slice(
    (state.search.currentPage - 1) * state.search.itemsPerPage,
    state.search.currentPage * state.search.itemsPerPage
  );
};

// Ф-я изменения порций и кол-ва ингредиентов
export const changeServings = function (newServings) {
  // Меняем кол-во каждого ингредиента
  state.recipe.ingredients.forEach((ingr) => {
    ingr.quantity = ingr.quantity
      ? (ingr.quantity / state.recipe.servings) * newServings
      : '';
  });
  // Меняем количество порции в обьекте
  state.recipe.servings = newServings;
};

// Ф-я сохранения/удал-я закладок из хранилища
const manageStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

//Ф-я для создания закладки на рецепте. Принимает рецепт и сохраняет его в state
export const addBookmark = function (recipe) {
  // Сохраняем рецепт в закладках
  state.bookmarks.push(recipe);
  state.recipe.bookmarked = true;
  // Обновление хранилища
  manageStorage();
};

// Ф-я для удаления рецепта из закладок
export const removeBookmark = function (recipeId) {
  const bookmarksRecipeInd = state.bookmarks.findIndex(
    (bookmarkedRecipe) => bookmarkedRecipe.id === recipeId
  );
  // Удаляем этот рецепт из массива "закладок"
  state.bookmarks.splice(bookmarksRecipeInd, 1);
  if (recipeId === state.recipe.id) state.recipe.bookmarked = false;
  // Обновление хранилища
  manageStorage();
};

// Вытаскиваем данные "закладок" из локального хранилища, чтобы они могли быть отображены в "закладках"
const init = function () {
  // Если пустой, то null
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (storage) state.bookmarks = storage;
};

// Ф-я для отправки данных рецепта на сервер
export const uploadRecipeData = async function (ownRecipeData) {
  try {
    // Данные из формы => форматируем под стандарт API
    const ingredients = Object.entries(ownRecipeData)
      .filter((entry) => entry[0].includes('ingredient') && entry[1] !== '')
      .map((ingr) => {
        const ingrArr = ingr[1].split(',').map((ingr) => ingr.trim());

        // Если в инпуте меньше 3х св-в(quantity, unit, description)
        if (ingrArr.length !== 3)
          throw new Error(
            'Wrong ingredients format. Please, follow the example formatting'
          );

        const [quantity, unit, description] = ingrArr;
        return { quantity, unit, description };
      });

    // Итоговый обьект с данными для отправки на сервер
    const recipe = {
      cooking_time: +ownRecipeData.cookingTime,
      image_url: ownRecipeData.image,
      publisher: ownRecipeData.publisher,
      servings: +ownRecipeData.servings,
      source_url: ownRecipeData.sourceUrl,
      title: ownRecipeData.title,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    // Переформатируем полученные данные от сервера под формат нашего приложения
    state.recipe = formatObjectData(data);
    // Закинем их в закладки
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

init();
