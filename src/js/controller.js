// Импорт обьекта status и ф-и Ajax запроса рецептов
import * as model from './model.js';
// Экземпляр(instance) класса recipeView(default import)
import recipeView from './views/recipeView.js';
// Экземпляр(instance) класса SearchView(default import)
import searchView from './views/searchView.js';
// Экземпляр(instance) класса SearchView(default import)
import resultsView from './views/resultsView.js';
// Экземпляр(instance) класса PaginationView(default import)
import paginationView from './views/paginationView.js';
// Экземпляр(instance) класса ServingsView(default import)
import servingsView from './views/servingsView.js';
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

// Управляет запросом рецептов через поиск и отображением списка рецептов с пагинацией
const controlSearchResults = async function () {
  try {
    // Получаем блюдо из инпута введенное в поиск
    const dish = searchView.dish;
    if (!dish) return;

    resultsView.renderSpinner();

    // Делаем Ajax запрос рецептов с блюдом
    await model.loadSearchResults(dish);

    // Отображаем список рецептов из части данных помещающихся на одну страницу
    resultsView.render(model.getSearchDataPart());
    // Отображаем начальную пагинацию под рецептами
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

// Управляет "перелистыванием" страниц списка рецептов
const controlPagination = function (page) {
  // Отображаем пред/след страницу списка рецептов
  resultsView.render(model.getSearchDataPart(page));
  // Отображаем новую нумерацию страниц под рецептами
  paginationView.render(model.state.search);
};

// Управляет изменением порций,ингредиентов и обновлением в UI рецептом
const controlServings = function (newServings) {
  model.changeServings(newServings);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
};
init();
