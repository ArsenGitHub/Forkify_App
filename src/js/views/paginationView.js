// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

import { View } from './View';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  // Возвращает верстку кнопок "предыдущая"/"следующая" страница
  _createHtml() {
    const btnPrev = `
      <button data-goto="${
        this._data.currentPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${this._data.currentPage - 1}</span>
      </button>`;

    const btnNext = `
      <button data-goto="${
        this._data.currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.currentPage + 1}</span>
         <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;

    //Если данных всего на одну страницу, то кнопки не отобразятся
    if (!(this._data.totalPages - 1)) return '';
    // Если тек-я стр 1 и кол-во данных больше, чем на одну страницу, то возвращаем только кнопку "следующий"
    if (this._data.currentPage === 1 && this._data.totalPages > 1)
      return btnNext;
    // Если текущая страница === общему кол-ву страниц, то возвращаем только кнопку "предыдущий"
    if (this._data.totalPages === this._data.currentPage) return btnPrev;

    // Иначе возвращаем обе кнопки
    return btnPrev + btnNext;
  }

  // Привязываем прослушиватель к общему родителю кнопок перелистывания списка рецептов(делегирование)Publisher-Subscriber Pattern
  addHandlerPagination(handler) {
    this._parentEl.addEventListener(
      'click',
      function (e) {
        const btn = e.target.closest('.btn--inline');
        // Если клик не по кнопкам и его потомка, а по самому контейнеру(общий родитель)
        if (!btn) return;
        // При клике на кнопку получаем значение его дата-атрибута, которая = либо следующей странице, либо предыдушей
        const goToNum = +btn.dataset.goto;

        handler(goToNum);
      }.bind(this)
    );
  }
}

export default new PaginationView();
