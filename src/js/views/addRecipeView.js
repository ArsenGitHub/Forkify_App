// Родительский класс
import { View } from './View';

class addRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _overlay = document.querySelector('.overlay');
  _recipeForm = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _succesMessage = 'Your recipe was succefully uploaded';

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  _handlerShowHide() {
    [this._overlay, this._recipeForm].forEach((elem) =>
      elem.classList.toggle('hidden')
    );
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener('click', this._handlerShowHide.bind(this));
  }

  _addHandlerHideForm() {
    [this._overlay, this._btnClose].forEach((elem) =>
      elem.addEventListener('click', this._handlerShowHide.bind(this))
    );
    window.addEventListener(
      'keydown',
      function (e) {
        if (e.key === 'Escape') {
          [this._overlay, this._recipeForm].forEach((elem) =>
            elem.classList.add('hidden')
          );
        }
      }.bind(this)
    );
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      // Получаем все данные рецепта из формы
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new addRecipeView();
