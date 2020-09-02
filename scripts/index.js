const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.edit-form');
const closeButton = document.querySelector('.popup__close');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const page = document.querySelector('.page');

function popupOpenClose() {
  if (!(popup.classList.contains('popup_is-opened'))) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
  popup.classList.toggle('popup_is-opened');
  page.classList.toggle('page_overflow_hidden')
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

closeButton.addEventListener('click', popupOpenClose)

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);