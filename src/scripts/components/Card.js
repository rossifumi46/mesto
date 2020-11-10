export default class Card {

  constructor({ data, isOwner, liked, likes, handleCardClick, handleDeleteBtnClick, handleLikeClick}, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._handleLikeClick = handleLikeClick;
    this._isOwner = isOwner;
    this._liked = liked;
    this._likes = likes;
  }

  isLiked() {
    return this._liked;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    if (!this._isOwner) {
      cardElement.querySelector('.element__trash-button').remove();
    }
    return cardElement;
  }

  toggleLike(likes) {
    this._element.querySelector('.element__like-button').classList.toggle('element_liked');
    this._likes = likes;
    this._liked = !this._liked
    this._element.querySelector('.element__likes').textContent = likes;
  }

  remove() {
    this._element.remove();
  }

  _setEventListeners() {
    this._imageElement = this._element.querySelector('.element__image')
    this._imageElement.addEventListener('click', this._handleCardClick);
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeClick);
    if (this._isOwner) {
      this._element.querySelector('.element__trash-button').addEventListener('click', this._handleDeleteBtnClick);
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._imageElement.src = this._image;
    this._element.querySelector('.element__title').textContent = this._title;
    if (this._liked) {
      this._element.querySelector('.element__like-button').classList.toggle('element_liked');
    }
    this._element.querySelector('.element__likes').textContent = this._likes;
    return this._element;
  }
}

