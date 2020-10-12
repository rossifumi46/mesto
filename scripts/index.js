import Card from './Card.js';
import FormValidator from './FormValidator.js';

const elements = document.querySelector('.elements');

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.popup_type_edit');
const createPopup = document.querySelector('.popup_type_create');

const editFormElement = editPopup.querySelector('.popup__form');
const editCloseButton = editPopup.querySelector('.popup__close');

const createFormElement = createPopup.querySelector('.popup__form');
const createCloseButton = createPopup.querySelector('.popup__close');

const nameInput = editFormElement.querySelector('#name-input');
const jobInput = editFormElement.querySelector('#job-input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardTitleInput = createFormElement.querySelector('#title-input');
const imageLinkInput = createFormElement.querySelector('#link-input');

const handleEsc = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editPopup);
}

const closeByClickOverlay = (element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(element);
    }
  })
}

function resetError(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    const errorElement = popup.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  }); 
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  resetError(editPopup);
  document.forms.createForm.reset();
  openPopup(editPopup);
});

editCloseButton.addEventListener('click', () => {
  closePopup(editPopup);
});

createCloseButton.addEventListener('click', () => {
  closePopup(createPopup)
});

addButton.addEventListener('click', () => {
  resetError(createPopup);
  openPopup(createPopup);
});

editFormElement.addEventListener('submit', formSubmitHandler);

createFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {};
  data.link = imageLinkInput.value;
  data.name = cardTitleInput.value;
  const card = new Card(data, '.card');
  elements.insertBefore(card.generateCard(), elements.firstChild);
  document.forms.createForm.reset();
  const button = createPopup.querySelector('.popup__button');
  button.classList.add('popup__button_disabled');
  closePopup(createPopup);
});

const imagePopup = document.querySelector('.popup_type_image');
const closeImgBtn = imagePopup.querySelector('.popup__close');

export {openPopup, closePopup, imagePopup, closeImgBtn, closeByClickOverlay};

initialCards.forEach((element) => {
  const card = new Card(element, '.card');
  elements.appendChild(card.generateCard());
})

closeByClickOverlay(editPopup);
closeByClickOverlay(createPopup);

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
