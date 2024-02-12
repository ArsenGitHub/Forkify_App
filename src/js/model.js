export const state = {
  recipe: {},
};

// Запрос данных рецепта из Forkify API
export const loadRecipe = async function (recipeId) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}(${response.status})`);

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
    alert(err);
  }
};
