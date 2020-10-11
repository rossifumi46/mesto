import {openPopup, closePopup, imagePopup, closeImgBtn, closeByClickOverlay} from './index.js'

export default class Card {

  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleImgClick(event) {
    openPopup(imagePopup);
    imagePopup.querySelector('.full-img').src = event.target.src;
    imagePopup.querySelector('.img-title').innerText = event.target.parentNode.querySelector('.element__title').innerText;
  }

  _handleDelete(event) {
    event.target.closest('.element').remove();
  };

  _handleLike(event) {
    event.target.classList.toggle('element_liked');
  }

  _setEventListeners() {
    this._imageElement = this._element.querySelector('.element__image')
    this._imageElement.addEventListener('click', this._handleImgClick);
    this._element.querySelector('.element__trash-button').addEventListener('click', this._handleDelete);
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLike);
    closeImgBtn.addEventListener('click', () => {
      closePopup(imagePopup);
    });
    closeByClickOverlay(imagePopup);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._imageElement.src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }
}

