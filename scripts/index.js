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

const editFormElement = editPopup.querySelector('.form');
const editCloseButton = editPopup.querySelector('.popup__close');

const createFormElement = createPopup.querySelector('.form');
const createCloseButton = createPopup.querySelector('.popup__close');

const nameInput = editFormElement.querySelector('.popup__input_type_name');
const jobInput = editFormElement.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const cardTitleInput = createFormElement.querySelector('.popup__input_type_name');
const imageLinkInput = createFormElement.querySelector('.popup__input_type_link');

const cardTemplate = document.querySelector('.card').content;

initialCards.forEach((element) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__title').innerText = element.name;
  card.querySelector('.element__image').src = element.link;
  elements.appendChild(card);
})

function popupOpenClose() {
  if (!(editPopup.classList.contains('popup_is-opened'))) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  editPopup.classList.toggle('popup_is-opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popupOpenClose();
}

editButton.addEventListener('click', popupOpenClose);

editCloseButton.addEventListener('click', popupOpenClose);

createCloseButton.addEventListener('click', () => createPopup.classList.toggle('popup_is-opened'));

addButton.addEventListener('click', () => {
  createPopup.classList.toggle('popup_is-opened');
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', formSubmitHandler);

createFormElement.addEventListener('submit', (event) => {
  event.preventDefault();
  const card = cardTemplate.cloneNode(true);
  if (cardTitleInput.value && imageLinkInput.value) {
    card.querySelector('.element__title').innerText = cardTitleInput.value;
    card.querySelector('.element__image').src = imageLinkInput.value;
    elements.insertBefore(card, elements.firstChild)
    createPopup.classList.toggle('popup_is-opened');
    render();
  }
});

const handleDelete = (event) => {
  elements.removeChild(event.target.parentNode);
};

const render = () => {
  elements.querySelectorAll('.element__trash-icon').forEach(btn => btn.addEventListener('click', handleDelete));
  elements.querySelectorAll('.element__image').forEach(img => img.addEventListener('click', handleImgClick));
  elements.querySelectorAll('.element__like-button').forEach(btn => btn.addEventListener('click', (event) => {
    event.target.classList.toggle('element_liked');
    event.target.parentNode.classList.toggle('element__like-button_hover');
  }));
}




imagePopup = document.querySelector('.type_image');
closeImgBtn = imagePopup.querySelector('.popup__close');
closeImgBtn.addEventListener('click', () => {
  imagePopup.classList.toggle('popup_is-opened');
  imagePopup.querySelector('.popup__container').classList.toggle('popup__container_img');
});

const handleImgClick = (event) => {
  imagePopup.classList.toggle('popup_is-opened');
  imagePopup.querySelector('.full-img').src = event.target.src;
  imagePopup.querySelector('.img-title').innerText = event.target.parentNode.querySelector('.element__title').innerText;
  imagePopup.querySelector('.popup__container').classList.toggle('popup__container_img');
};

render();

