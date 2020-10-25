export default class Card {

  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleDelete(event) {
    event.target.closest('.element').remove();
  };

  _handleLike(event) {
    event.target.classList.toggle('element_liked');
  }

  _setEventListeners() {
    this._imageElement = this._element.querySelector('.element__image')
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._element.querySelector('.element__trash-button').addEventListener('click', this._handleDelete);
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLike);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._imageElement.src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }
}

