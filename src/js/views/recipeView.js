// Родительский класс
import { View } from './View';

// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';
// Библиотека(десятичные => дробные для рецепта)
import { Fraction } from 'fractional';

// Класс с функционалом отображения рецепта
class RecipeView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.recipe');

  // Возвращает верстку блока рецепта
  _createMarkup() {
    return `
      <figure class="recipe__fig">
        <img src="${this._data.imageUrl}" alt="${
      this._data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-servings="${
              this._data.servings - 1
            }" class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button data-update-servings="${
              this._data.servings + 1
            }" class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.reduce((acc, ingr) => {
          const ingredient = `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ingr.quantity ? new Fraction(ingr.quantity) : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingr.unit}</span>
                ${ingr.description}
              </div>
            </li>
            `;
          return acc + ingredient;
        }, '')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  // Прослушиватель для отображения рецепта (Publisher-Subscriber Pattern)
  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }

  // Прослушиватель, для изменения кол-ва порций (Publisher-Subscriber Pattern)
  addHandlerServings(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const servingsBtn = e.target.closest('.btn--increase-servings');

      if (!servingsBtn) return;

      // Кол-во порции
      const servings = +servingsBtn.dataset.updateServings;
      if (servings) handler(servings);
    });
  }

  // Прослушиватель, для добавления закладок рецептов (Publisher-Subscriber Pattern)
  addHandlerBookmark(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const bookmarkBtn = e.target.closest('.btn--bookmark');

      if (!bookmarkBtn) return;
      handler();
    });
  }
}

export default new RecipeView();
