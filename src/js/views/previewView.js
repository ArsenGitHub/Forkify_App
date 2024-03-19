// Родительский класс
import { View } from './View';
// SVG картинки рецептов
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.results');

  generateMarkup(data) {
    // Получаем хэш
    const currRecipeId = window.location.hash.slice(1);

    return data.reduce((acc, recipe) => {
      const card = `
        <li class="preview">
          <a class="preview__link preview__link ${
            currRecipeId === recipe.id ? 'preview__link--active' : ''
          }" href="#${recipe.id}">
            <figure class="preview__fig">
              <img src="${recipe.imageUrl}" alt="${recipe.title}"/>
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${recipe.title}</h4>
              <p class="preview__publisher">${recipe.publisher}</p>
              <div class="preview__user-generated ${
                recipe.key ? '' : 'hidden'
              }">
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
  }
}

export default new PreviewView();
