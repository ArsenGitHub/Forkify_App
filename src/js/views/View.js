// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

export class View {
  _data;
  _errorMessage = 'Can not find recipe. Try another one!';
  _succesMessage = 'Success';

  // Отображение рецепта(Public API)
  render(data) {
    // Проверяем, что пришедший массив от API не пустой(при ошибке ввода имени рецепта)
    if (Array.isArray(data) && !data.length) return this.renderError();
    this._data = data;
    const html = this._createHtml();
    this._clearAndInsert(html);
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
    this._clearAndInsert(html);
  }

  // Отображение блока с ошибкой
  renderError(err = this._errorMessage) {
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
    this._clearAndInsert(html);
  }

  // Отображение блока с сообщением о удачной попытке чего-либо
  renderSuccess(message = this._succesMessage) {
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
    this._clearAndInsert(html);
  }

  //Очистка родительского блока(верстки) и вставка новой верстки
  _clearAndInsert(html) {
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', html);
  }
}
