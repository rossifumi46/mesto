let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', function () {
  popup.classList.toggle('popup_is-opened');
})

let closeButton = document.querySelector('.popup__close');

closeButton.addEventListener('click', function () {
  popup.classList.toggle('popup_is-opened');
})







// Находим форму в DOM
let formElement = document.querySelector('.edit-form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = formElement.querySelector('.input-name');
    let jobInput = formElement.querySelector('.input-job')

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle')

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    popup.classList.toggle('popup_is-opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);