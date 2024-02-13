// Импорт обьекта status и ф-и Ajax запроса рецептов
import * as model from './model.js';
// Экземпляр(instance) класса recipeView(default import)
import recipeView from './views/recipeView.js';
// Полифилы
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Управляет запросом данных в модели и отображением всего в представлении
const controlRecipes = async function () {
  try {
    // Получаем хэш
    const recipeId = window.location.hash.slice(1);
    // Если пустой хэш
    if (!recipeId) return;

    // Отображаем спинер
    recipeView.renderSpinner();
    // Делаем Ajax запрос рецепта
    await model.loadRecipe(recipeId);
    // Отображаем рецепт
    recipeView.renderRecipe(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

['load', 'hashchange'].forEach((ev) => {
  window.addEventListener(ev, controlRecipes);
});
