// Forkify API
import { API_URL } from './config';
// Fetch helper
import { getData } from './helpers';

export const state = {
  recipe: {},
  search: {},
};

// Юзер кликает
// Создаем прослушиватель в представлении
// Создаем запрос данных в модели
// Вешаем в ините прослушиватель - запрос данных
// Данные приходят - сохраняем их в state
// Создаем ф-ю отображения списка рецептов в представлении

// Запрос рецептов по поиску
export const loadSearchResults = async function (dish) {
  try {
    // Данные поиска
    state.search.result = [];
    // Блюдо из инпута введенное в поиск, пока не нужно, но может где-то понадобится. Например, самые частые запросы
    state.search.dish = dish;
    const data = await getData(
      `${API_URL}?search=${dish}&key=b8654b87-eb3f-4393-b226-d15907312864`
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
