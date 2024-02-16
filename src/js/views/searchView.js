class SearchView {
  // Форма поиска
  #parentEl = document.querySelector('.search');
  #dish = this.#parentEl.querySelector('.search__field').value;

  // Берем блюдо из инпута введенное в поиск
  // Делаем это здесь, т.к. инпут является часть UI или логики представления
  get dish() {
    const dish = this.#parentEl.querySelector('.search__field').value;
    this.#clearSearchInput();
    return dish;
  }

  // Чистим инпут
  #clearSearchInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  // Вешаем прослушиватель(Publisher-Subscriber Pattern)
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      // Предотвращаем перезагрузку страницы при отправке формы
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
