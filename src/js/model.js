// Forkify API
import { API_URL } from './config';
// Fetch helper
import { getData } from './helpers';
// Кол-во рецептов на страницу
import { ITEMS_PER_PAGE } from './config';

export const state = {
  recipe: {},
  search: {
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
  },
};

// Запрос рецептов по поиску
export const loadSearchResults = async function (dish) {
  try {
    // Данные поиска
    state.search.result = [];
    // Сохраняем блюдо из поиска
    state.search.dish = dish;
    // Запрашиваем данные рецептов на основе блюда из инпута
    const data = await getData(
      `${API_URL}?search=${dish}&key=b8654b87-eb3f-4393-b226-d15907312864`
    );
    // Общее количество страниц необходимое для отображаения рецептов
    state.search.totalPages = Math.ceil(
      data.data.recipes.length / state.search.itemsPerPage
    );

    data.data.recipes.forEach((recipe) => {
      state.search.result.push({
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      });
    });
  } catch (err) {
    throw err;
  }
};

// Запрос данных рецепта из Forkify API
export const loadRecipe = async function (recipeId) {
  try {
    const data = await getData(API_URL + recipeId);

    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (err) {
    throw err;
  }
};

// Ф-я деления данных на страницы, возвращает кол-во данных =
export const getSearchDataPart = function (page = state.search.currentPage) {
  state.search.currentPage = page;

  return state.search.result.slice(
    (state.search.currentPage - 1) * state.search.itemsPerPage,
    state.search.currentPage * state.search.itemsPerPage
  );
};
