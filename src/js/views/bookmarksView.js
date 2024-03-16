// Родительский класс
import { View } from './View';
import previewView from './previewView.js';

class BookmarksView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.bookmarks');
  _errorMessage = 'Please, Add your bookmarks and enjoy your cooking!';

  _createMarkup() {
    return previewView.generateMarkup(this._data);
  }
  // Для отображения списка закладок после полной прогрузки сайта
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
