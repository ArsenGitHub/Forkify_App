// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

const logo = document.querySelector('.header__logo');
logo.addEventListener('click', function () {
  window.location.hash = '';
  window.location.reload();
});

export class View {
  _data;
  _errorMessage = 'Can not find recipe. Try another one!';
  _succesMessage = 'Success';

  // Отображение данных в UI
  render(data) {
    // Проверяем, что пришедший массив от API не пустой(при ошибке ввода имени рецепта)
    if (Array.isArray(data) && !data.length) return this.renderError();
    this._data = data;
    const markup = this._createMarkup();
    this._clearAndInsert(markup);
  }

  // Обновление только измененной части UI(при взаимодействии пользователя)
  update(data) {
    // Переназначаем текущие данные на измененные данные
    this._data = data;
    // Создаем новую верстку из измененных данных
    const newMarkup = this._createMarkup();
    // Преобразует строку в фрагмент document (в узлы(node))
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    // Новые узлы верстки
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // Старые узлы верстки
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      // Узел "старой" верстки
      const curEl = currentElements[i];
      // Если новый узел !== старому узлу и его дочерний узел текст(text node)
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim()) {
        // Меняем содержимые отличающихся текстов
        curEl.textContent = newEl.textContent;
      }
      // Если новый узел !== старому узлу
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((el) => {
          // Заменяем "старый" дата-атрибут на новый
          curEl.setAttribute(el.name, el.value);
        });
      }
    });
  }

  // Отображение спинера загрузки
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clearAndInsert(markup);
  }

  // Отображение блока с ошибкой
  renderError(err = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${err}</p>
    </div>
        `;
    this._clearAndInsert(markup);
  }

  // Отображение блока с сообщением о удачной попытке чего-либо
  renderSuccess(message = this._succesMessage) {
    const markup = `
      <div class="message">
        <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
        </div>
        <p>${message}</p>
      </div>
        `;
    this._clearAndInsert(markup);
  }

  //Очистка родительского блока(верстки) и вставка новой верстки
  _clearAndInsert(markup) {
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }
}
