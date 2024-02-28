// Родительский класс
import { View } from './View';

class resultsView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.results');

  _createHtml() {
    return this._data.reduce((acc, recipe) => {
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
}

export default new resultsView();
