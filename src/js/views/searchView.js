const logo = document.querySelector('.header__logo');
logo.addEventListener('click', function () {
  window.location.hash = '';
  window.location.reload();
});

class SearchView {
  // Форма поиска
  _parentEl = document.querySelector('.search');
  #dish;

  // Берем блюдо из инпута введенное в поиск
  get dish() {
    this.#dish = this._parentEl.querySelector('.search__field').value;
    this._clearSearchInput();
    return this.#dish;
  }

  // Чистим инпут
  _clearSearchInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  // Вешаем прослушиватель на отправку формы с инпутом(Publisher-Subscriber Pattern)
  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
