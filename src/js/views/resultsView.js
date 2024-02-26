// Родительский класс
import { View } from './View';

const btnContainer = document.querySelector('.pagination');
const btnPrev = document.querySelector('.pagination__btn--prev');
const btnNext = document.querySelector('.pagination__btn--next');
const btnPrevTxt = btnPrev.querySelector('span');
const btnNextTxt = btnNext.querySelector('span');

class resultsView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.results');

  // Pagination
  #displayedItems = 0;
  #itemsPerPage = 10;
  #currentPage = 0;

  constructor() {
    super();
    this.btnEvent();
  }

  _createHtml() {
    return this._data
      .slice(this.#displayedItems, this.#displayedItems + this.#itemsPerPage)
      .reduce((acc, recipe) => {
        const card = `
        <li class="preview">
          <a class="preview__link preview__link" href="#${recipe.id}">
            <figure class="preview__fig">
              <img src="${recipe.imageUrl}" alt="${recipe.title}"/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
            </div>
          </a>
        </li>
        `;
        return acc + card;
      }, '');
  }

  resetPagination() {
    this.#displayedItems = 0;
    this.#currentPage = 0;
    btnPrevTxt.innerText = `Page ${this.#currentPage}`;
    btnNextTxt.innerText = `Page ${this.#currentPage + 2}`;
  }

  hideBtn(btn) {
    btn.style.transform = 'translateY(100vh)';
  }
  renderBtn(btn) {
    btn.style.transform = 'translateY(0)';
  }

  renderBtns() {
    this.resetPagination();
    this.renderBtn(btnContainer);
    this.hideBtn(btnPrev);
  }

  btnEvent() {
    [btnPrev, btnNext].forEach((btn, i) => {
      btn.addEventListener(
        'click',
        function () {
          if (i === 0) {
            this.#displayedItems -= this.#itemsPerPage;
            this.render(this._data);

            // Скрыть кнопку "предыдущий"
            if (this.#currentPage === 1) this.hideBtn(btnPrev);
            // Отобразить кнопку "следующий"
            if (
              Math.round(this._data.length / this.#itemsPerPage) - 1 ===
              this.#currentPage
            )
              this.renderBtn(btnNext);
          }

          if (i === 1) {
            this.#displayedItems += this.#itemsPerPage;
            this.render(this._data);

            // Скрыть кнопку "следующий"
            if (this._data.length < this.#displayedItems + this.#itemsPerPage)
              this.hideBtn(btnNext);
            // Отобразить кнопку "предыдущий"
            if (this.#currentPage === 0) this.renderBtn(btnPrev);
          }
          this.#currentPage = Math.round(
            this.#displayedItems / this.#itemsPerPage
          );
          // Вычислить текущую страницу
          btnPrevTxt.innerText = `Page ${this.#currentPage}`;
          btnNextTxt.innerText = `Page ${this.#currentPage + 2}`;
        }.bind(this)
      );
    });
  }
}

export default new resultsView();
