// Импорт обьекта status и ф-и Ajax запроса рецептов
import * as model from './model.js';
import view from './views/View.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { FORM_HIDE_SEC } from './config.js';

// Полифилы
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Управляет запросом данных в модели и отображением рецепта в представлении
const controlRecipe = async function () {
  try {
    // Получаем хэш
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;

    // Обновляем элемент списка(чтобы выделить активный рецепт в списке)
    resultsView.update(model.getSearchDataPart());
    // Обновляем элемент списка из закладок
    bookmarksView.update(model.state.bookmarks);
    // Отображаем спинер
    recipeView.renderSpinner();
    // Делаем Ajax запрос рецепта
    await model.loadRecipe(recipeId);
    // Отображаем полный рецепт
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
  // Меняет кол-во порций  и кол-во каждого ингредиента
  model.changeServings(newServings);
  // Обновляем UI(рецепт)
  recipeView.update(model.state.recipe);
};

// Управляет закладками рецептов
const controlBookmark = function () {
  // Если рецепт в "закладках", то удаляем его из "закладок". Иначе добавляем в закладки
  if (model.state.recipe.bookmarked) {
    model.removeBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  // Обновляем UI
  recipeView.update(model.state.recipe);
  // Отображаем рецепты из закладок в "закладках"
  bookmarksView.render(model.state.bookmarks);
};

// Для отображения списка закладок после полной прогрузки сайта
const controlBookmarksList = function () {
  bookmarksView.render(model.state.bookmarks);
};

// Отправка данных св-его рецепта и его отображение
const controlAddRecipe = async function (ownRecipeData) {
  try {
    addRecipeView.renderSpinner();
    // Отправляем данные на сервер
    await model.uploadRecipeData(ownRecipeData);
    // Отображаем наш отправленный рецепт
    recipeView.render(model.state.recipe);
    // Отображаем список закладок с новым рецептом
    bookmarksView.render(model.state.bookmarks);
    // Отображаем вместо формы сообщение об успешной отправке данных
    addRecipeView.renderSuccess();
    // Меняем URL, добавляем id нашего рецепта
    window.history.pushState({}, '', `#${model.state.recipe.id}`);
    // window.location.hash = model.state.recipe.id;
    // Скрывем форму и оверлэй
    setTimeout(function () {
      addRecipeView._handlerShowHide();
    }, FORM_HIDE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  bookmarksView.addHandlerRender(controlBookmarksList);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
