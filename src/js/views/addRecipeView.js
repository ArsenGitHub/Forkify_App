// Родительский класс
import { View } from './View';

// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _recipeForm = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  // Прослушиватель, для добавления закладок рецептов (Publisher-Subscriber Pattern)
  addHandlerShowForm(handler) {
    this._btnOpen.addEventListener('click', function () {
      [this._overlay, this._recipeForm].forEach((elem) =>
        elem.classList.remove('hidden')
      );
      handler();
    });
  }
}

export default new addRecipeView();
