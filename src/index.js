import './pages/index.css'; // добавьте импорт главного файла стилей 

import UserInfo from './scripts/components/UserInfo.js'
import Card from './scripts/components/Card.js';
import FormValidator from './scripts/components/FormValidator.js';
import PopupWithImage from './scripts/components/PopupWithImage.js';
import PopupWithForm from './scripts/components/PopupWithForm.js';
import PopupSubmit from './scripts/components/PopupSubmit.js';
import Section from './scripts/components/Section';

import Api from './scripts/components/Api.js';

import {
  elementsSelector,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  popupWithImageSelector,
  popupWithCreateFormSelector,
  popupWithEditFormSelector,
  popupSubmitSelector,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  avatar
} from './scripts/constants.js';


const user = new UserInfo(profileTitle, profileSubtitle);

const popupWithImage = new PopupWithImage(popupWithImageSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'd0e1e3a1-2328-401d-87db-610b930721e8',
    'Content-Type': 'application/json'
  }
});

const popupSubmit = new PopupSubmit(popupSubmitSelector);
popupSubmit.setEventListeners();
let section = {}
api.getInitialCards()
  .then((result) => {
    section  = new Section({
      items: result,
      renderer: (item) => {
        const isOwner = user.getUserInfo().id === item.owner._id;
        const card = new Card({
          data: item,
          isOwner,
          liked: item.likes.some(x => x._id === user.getUserInfo().id),
          likes: item.likes.length,
          handleCardClick: (event) => {
            popupWithImage.open(event);
          },
          handleDeleteBtnClick: () => {
            popupSubmit.open();
            popupSubmit.setPopupSubmitHandler(() => {
              api.deleteCard(item._id)
                .then(() => {
                  card.remove();
                })
                .catch((err) => {
                  console.log(err); // выведем ошибку в консоль
                });
            });
          },
          handleLikeClick: () => {
            const  method = card.isLiked() ? 'DELETE' : 'PUT'
            api.like(item._id, method)
              .then((result) => {
                card.toggleLike(result.likes.length);
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              }); 
          }
        }, '.card');
        return card.generateCard();
      }
    }, elementsSelector);
    section.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getProfile()
  .then((result) => {
    user.setUserinfo(result);
    avatar.style.backgroundImage = `url('${result.avatar}')`;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 

const popupAvatar = new PopupWithForm(
  (event) => {
    event.preventDefault();
    popupAvatar.setStateSaving();
    api.updateAvatar(popupAvatar.getInputValues().link_input)
      .then((result) => {
        avatar.style.backgroundImage = `url('${result.avatar}')`;
        popupAvatar.setStateFinished();
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }); 
  }, '.popup_type_avatar');

popupAvatar.setEventListeners();

avatar.addEventListener('click', () => {
  popupAvatar.open();
})

const popupWithCreateForm = new PopupWithForm(
  (event) => {
    event.preventDefault();

    popupWithCreateForm.setStateSaving();
    api.createCard(titleInput.value, linkInput.value)
    .then((result) => {
      const isOwner = user.getUserInfo().id === result.owner._id;
      const card = new Card({
        data: result,
        isOwner,
        liked: result.likes.some(x => x._id === user.getUserInfo().id),
        likes: result.likes.length,
        handleCardClick: (event) => {
          popupWithImage.open(event);
        },
        handleDeleteBtnClick: () => {
          popupSubmit.open();
          popupSubmit.setPopupSubmitHandler(() => {
            api.deleteCard(result._id)
              .then(() => {
                card.remove();
              })
              .catch((err) => {
                console.log(err); // выведем ошибку в консоль
              }); 
          });
        },
        handleLikeClick: () => {
          const  method = card.isLiked() ? 'DELETE' : 'PUT'
          api.like(result._id, method)
            .then((result) => {
              card.toggleLike(result.likes.length);
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        }
      }, '.card');
      section.addItem(card.generateCard());
      popupWithCreateForm.setStateFinished();
      popupWithCreateForm.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }); 

  }, popupWithCreateFormSelector);

const popupWithEditForm = new PopupWithForm(
  (event) => {
    event.preventDefault();

    popupWithEditForm.setStateSaving();
    api.editProfile(popupWithEditForm.getInputValues())
      .then((result) => {
        profileTitle.textContent = result.name;
        profileSubtitle.textContent = result.about;
        popupWithEditForm.setStateFinished();
        popupWithEditForm.close()
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })

  }, popupWithEditFormSelector);

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