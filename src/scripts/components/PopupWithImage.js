import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(event) {
    const fullImg = this._popup.querySelector('.full-img');
    const imgTitle = this._popup.querySelector('.img-title');
    fullImg.src = event.target.src;
    imgTitle.innerText = event.target.parentNode.querySelector('.element__title').innerText;
    super.open();
  }
}