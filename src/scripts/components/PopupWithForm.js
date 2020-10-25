import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(formSubmitHandler, popupSelector) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
  }

  _getInputValues() {
    inputValues = [];
    this._inputList.forEach( (inputElement) => {
      inputValues.push(inputElement.value);
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event)=> {
      this._formSubmitHandler(event);
      this.close();
    })
  }

  close() {
    this._form.reset();
    this._hideErrorMessage()
    const button = this._popup.querySelector('.popup__button');
    button.classList.add('popup__button_disabled');
    super.close();
  }

  _hideErrorMessage() {
    this._inputList.forEach( (inputElement) => {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove('popup__input_type_error');
      errorElement.classList.remove('popup__error_visible');
      errorElement.textContent = '';
    }); 
  }
}
