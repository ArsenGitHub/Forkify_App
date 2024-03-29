// Родительский класс
import { View } from './View';
import previewView from './previewView.js';

class ResultsView extends View {
  // Родительский блок, куда вставляется верстка рецепта
  _parentEl = document.querySelector('.results');

  _createMarkup() {
    return previewView.generateMarkup(this._data);
  }
}

export default new ResultsView();
