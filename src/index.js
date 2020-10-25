import './pages/index.css'; // добавьте импорт главного файла стилей 

import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';

import {
  initialCards,
  elements,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  popupWithImageSelector,
  popupWithCreateFormSelector,
  popupWithEditFormSelector,
  nameInput,
  jobInput,
  titleInput,
  linkInput
} from './scripts/constants.js';

const popupWithImage = new PopupWithImage(popupWithImageSelector);

initialCards.forEach((element) => {
  const card = new Card({
    data: element,
    handleCardClick: (event) => {
      popupWithImage.open(event);
    }
  }, '.card');
  elements.appendChild(card.generateCard());
})

const popupWithCreateForm = new PopupWithForm(
  (event) => {
    event.preventDefault();

    const card = new Card({
      data: {
        name: titleInput.value, link: linkInput.value
      }, 
      handleCardClick: (event) => {
        popupWithImage.open(event);
      }
    }, '.card');
    elements.prepend(card.generateCard());
  }, popupWithCreateFormSelector);

const popupWithEditForm = new PopupWithForm(
  (event) => {
    event.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
  },
  popupWithEditFormSelector);

popupWithImage.setEventListeners();
popupWithCreateForm.setEventListeners();
popupWithEditForm.setEventListeners();

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupWithEditForm.open();
});

addButton.addEventListener('click', () => {
  popupWithCreateForm.open();
});

const formList = Array.from(document.querySelectorAll('.popup__form',));

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

formList.forEach((formElement) => {
  new FormValidator(validationSettings, formElement).enableValidation();
});