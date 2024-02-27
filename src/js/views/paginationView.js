// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

import { View } from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  // // Pagination
  // #itemsPerPage = this._data.itemsPerPage;
  // #currentPage = this._data.currentPage;

  _createHtml() {
    const btnPrev = `
      <button class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.currentPage - 1}</span>
      </button>`;

    const btnNext = `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${this._data.currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;

    if (this._data.currentPage === 1 && this._data.totalPages > 1)
      return btnNext;
    if (this._data.totalPages < this._data.currentPage + 1) return btnPrev;
    if (!(this._data.totalPages - 1)) return;

    return btnPrev + btnNext;
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        const prevBtn = e.target.closest('.pagination__btn--prev');
        const nextBtn = e.target.closest('.pagination__btn--next');

        if (!prevBtn && !nextBtn) return;

        if (prevBtn) this._data.currentPage--;
        if (nextBtn) this._data.currentPage++;

        handler();
      }.bind(this)
    );
  }
}

export default new PaginationView();
