class SevingsView {
  _parentEl = document.querySelector('.recipe__info-buttons');

  addHandlersevings(handler) {
    get;
    this._parentEl.addEventListener('click', function () {
      const servingsAmount = document.querySelector(
        '.recipe__info-data--people'
      ).textContent;
      handler(servingsAmount);
    });
  }
}

export default new SevingsView();
