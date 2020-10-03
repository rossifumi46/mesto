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

const cardTemplate = document.querySelector('.card').content;


const handleEsc = (evt) => {
  const popup = document.querySelector('.popup_is-opened');
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEsc);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

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

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(editPopup);
});

editCloseButton.addEventListener('click', () => {
  closePopup(editPopup);
});

createCloseButton.addEventListener('click', () => {
  closePopup(createPopup)
});

addButton.addEventListener('click', () => {
  openPopup(createPopup);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler);

createFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {};
  data.link = imageLinkInput.value;
  data.name = cardTitleInput.value;
  const card = getCardElement(data);
  elements.insertBefore(card, elements.firstChild);
  document.forms.createForm.reset();
  const button = createPopup.querySelector('.popup__button');
  button.classList.add('popup__button_disabled');
  closePopup(createPopup);
});

const handleDelete = (event) => {
  event.target.closest('.element').remove();
};

const getCardElement = (data) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').innerText = data.name;
  const img = card.querySelector('.element__image');
  img.src = data.link;
  card.querySelector('.element__trash-button').addEventListener('click', handleDelete);
  img.addEventListener('click', handleImgClick);
  card.querySelector('.element__like-button').addEventListener('click', (event) => {
    event.target.classList.toggle('element_liked');
  });
  return card;
}

const imagePopup = document.querySelector('.popup_type_image');
const closeImgBtn = imagePopup.querySelector('.popup__close');
closeImgBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

const handleImgClick = (event) => {
  openPopup(imagePopup);
  imagePopup.querySelector('.full-img').src = event.target.src;
  imagePopup.querySelector('.img-title').innerText = event.target.parentNode.querySelector('.element__title').innerText;
};

initialCards.forEach((element) => {
  elements.appendChild(getCardElement(element));
})

closeByClickOverlay(editPopup);
closeByClickOverlay(createPopup);
closeByClickOverlay(imagePopup);


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
