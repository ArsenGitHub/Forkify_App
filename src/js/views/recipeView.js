// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';
// Библиотека(десятичные => дробные для рецепта)
import { Fraction } from 'fractional';

const recipeListContainer = document.querySelector('.results');

// Класс с функционалом отображения
class RecipeView {
  // Родительский блок, куда вставляется верстка рецепта
  #parentEl = document.querySelector('.recipe');
  // Данные из сервера
  #data;
  #errorMessage = 'Can not find recipe. Try another one!';
  #succesMessage = '';
  // Отображение списка рецептов
  renderRecipeList(recipesArr) {
    const html = recipesArr.reduce((acc, recipe) => {
      const card = `
      <li class="preview">
        <a class="preview__link preview__link--active" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.imageUrl}" alt="Recipe img" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
      `;
      return acc + card;
    }, '');
    recipeListContainer.innerHTML = '';
    recipeListContainer.insertAdjacentHTML('afterbegin', html);
  }

  // Отображение рецепта(Public API)
  renderRecipe(data) {
    this.#data = data;
    const html = this.#createHtml();
    this.#clearAndInsert(html);
  }

  // Отображение спинера загрузки
  renderSpinner() {
    const html = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this.#clearAndInsert(html);
  }

  // Отображение блока с ошибкой
  renderError(err = this.#errorMessage) {
    const html = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${err}</p>
    </div>
        `;
    this.#clearAndInsert(html);
  }

  // Отображение блока с сообщением о удачной попытке чего-либо
  renderSuccess(message = this.#succesMessage) {
    const html = `
      <div class="message">
        <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
      </div>
        `;
    this.#clearAndInsert(html);
  }

  //Очистка родительского блока(верстки) и вставка новой верстки
  #clearAndInsert(html) {
    this.#parentEl.innerHTML = '';
    this.#parentEl.insertAdjacentHTML('beforeend', html);
  }

  // Возвращает верстку блока рецепта
  #createHtml() {
    return `
      <figure class="recipe__fig">
        <img src="${this.#data.imageUrl}" alt="${
      this.#data.title
    }" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}</span>
        </h1>
      </figure>
  
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this.#data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this.#data.servings
          }</span>
          <span class="recipe__info-text">servings</span>
  
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
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
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>
  
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this.#data.ingredients.reduce((acc, ingr) => {
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
          <span class="recipe__publisher">${this.#data.publisher}</span>. Please
          check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.sourceUrl}"
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

  // Publisher-Subscriber Pattern
  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((ev) => {
      window.addEventListener(ev, handler);
    });
  }
}

export default new RecipeView();
