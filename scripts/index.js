const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');

// Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const editPopup = document.querySelector('.type_edit');
const createPopup = document.querySelector('.type_create');

const editFormElement = editPopup.querySelector('.popup__form');
const editCloseButton = editPopup.querySelector('.popup__close');

const createFormElement = createPopup.querySelector('.popup__form');
const createCloseButton = createPopup.querySelector('.popup__close');

const nameInput = editFormElement.querySelector('#name-input');
const jobInput = editFormElement.querySelector('#job-input');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardTitleInput = createFormElement.querySelector('#name-input');
const imageLinkInput = createFormElement.querySelector('#link-input');

const cardTemplate = document.querySelector('.card').content;




function popupToggle(popup) {
  popup.classList.toggle('popup_is-opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupToggle(editPopup);
}

const closeByClickOverlay = (element) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      popupToggle(element);
    }
  })
}

const closeByEsc = (element) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" && element.classList.contains('popup_is-opened'))
      popupToggle(element);
  })
}

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupToggle(editPopup);
});

editCloseButton.addEventListener('click', () => {
  popupToggle(editPopup);
});

createCloseButton.addEventListener('click', () => {
  popupToggle(createPopup)
});

addButton.addEventListener('click', () => {
  popupToggle(createPopup);
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
  elements.insertBefore(card, elements.firstChild)
  popupToggle(createPopup);
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

imagePopup = document.querySelector('.type_image');
closeImgBtn = imagePopup.querySelector('.popup__close');
closeImgBtn.addEventListener('click', () => {
  popupToggle(imagePopup);
  imagePopup.querySelector('.popup__container').classList.toggle('popup__container_img');
});

const handleImgClick = (event) => {
  popupToggle(imagePopup);
  imagePopup.querySelector('.full-img').src = event.target.src;
  imagePopup.querySelector('.img-title').innerText = event.target.parentNode.querySelector('.element__title').innerText;
  imagePopup.querySelector('.popup__container').classList.toggle('popup__container_img');
};

initialCards.forEach((element) => {
  elements.appendChild(getCardElement(element));
})

closeByClickOverlay(editPopup);
closeByClickOverlay(createPopup);
closeByClickOverlay(imagePopup);
closeByEsc(editPopup);
closeByEsc(createPopup);
closeByEsc(imagePopup);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 
