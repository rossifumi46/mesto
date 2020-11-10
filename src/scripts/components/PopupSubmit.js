import Popup from './Popup.js';

export default class PopupSubmit extends Popup {
  constructor(popupSubmitSelector) {
    super(popupSubmitSelector);
    this._submitBtnElement = this._popup.querySelector('.popup__button');
  }

  setPopupSubmitHandler(submitHandler) {
    this._submitBtnElement.addEventListener('click', submitHandler);
  }
}