// Импорт обьекта status и ф-и Ajax запроса рецептов
import * as model from './model.js';
// Экземпляр(instance) класса recipeView(default import)
import recipeView from './views/recipeView.js';
// Экземпляр(instance) класса SearchView(default import)
import searchView from './views/searchView.js';
// Экземпляр(instance) класса SearchView(default import)
import resultsView from './views/resultsView.js';
// Полифилы
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Управляет запросом данных в модели и отображением всего в представлении
const controlRecipe = async function () {
  try {
    // Получаем хэш
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    // Отображаем спинер
    recipeView.renderSpinner();
    // Делаем Ajax запрос рецепта
    await model.loadRecipe(recipeId);
    // Отображаем рецепт
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Отображаем ошибку в UI
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Получаем блюдо из инпута введенное в поиск
    const dish = searchView.dish;
    if (!dish) return;

    resultsView.renderSpinner();

    // Делаем Ajax запрос рецептов с блюдом
    await model.loadSearchResults(dish);

    resultsView.render(model.state.search.result);
    resultsView.renderBtns();
  } catch (err) {
    resultsView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
