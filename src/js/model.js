// Forkify API
import { API_URL } from './config';
// Fetch helper
import { getData } from './helpers';

export const state = {
  recipe: {},
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
    console.error(err);
  }
};
