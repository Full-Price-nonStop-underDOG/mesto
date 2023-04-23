import '../pages/index.css';

import {
  PopupConfirmation
} from "../components/PopupConfirmation.js";

import {
  UserInfo
} from '../components/UserInfo.js';

import {
  Section
} from '../components/Section.js';

import {
  PopupWithImage
} from '../components/PopupWithImage.js';

import {
  PopupWithForm
} from '../components/PopupWithForm.js';

import {
  initialCards
} from '../scripts/constants.js';

import {
  FormValidator
} from '../components/FormValidator.js';

import {
  Card
} from '../components/Card.js';

import {
  Api
} from "../components/Api.js";

import {
  elementsApi
} from '../scripts/constants.js';

export const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');
const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenTitle = document.querySelector('.popup__fullscreen-title');
const bigImageCloserEvent = document.querySelector('.popup__container-img');

export {
  fullscreenImage,
  fullscreenTitle,
  bigImageCloserEvent
}

const config = {
  formSelector: '.form',
  formFields: '.form__field',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  errorField: '.form__field_type_error',
  errorOpacity: 'form__field-error_visible'
}

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__job'
});

const api = new Api(elementsApi);

const cardSection = new Section({
    renderer: (data) => {
      const card = createCard(data)

      cardSection.addItem(card)
    },
  },
  ".mesta"
);

async function loadInitialCards() {
  try {
    const cards = await api.getInitialCardsData();
    console.log(cards);

    const cardsSection = new Section(cards, (item) => cardsSection.addItem(createCard(item)), ".mesta");
    cardsSection.renderItems();
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

loadInitialCards();

const profileValidator = new FormValidator(config, profilePopup);
profileValidator.enableValidation();

const cardCreateValidator = new FormValidator(config, cardCreatePopup);
cardCreateValidator.enableValidation();

const popupEditProfile = new PopupWithForm('#popup_type_edit', (data) => {
  handleEditProfileSubmit(data);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

function handleEditProfileSubmit(formData) {
  
  api.editProfileInfo(formData)
    .then((formData) => {
      console.log('ghhbhbhhghgh', formData);
      userInfo.setUserInfo(formData);

    });
}

buttonEdit.addEventListener('click', () => {
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  jobInput.value = dataUser.info;
  profileValidator.resetValidation();
  popupEditProfile.open();
})

const popupImage = new PopupWithImage('.popup_img');
popupImage.setEventListeners();

function handleCardClick(item) {
  popupImage.open(item.name, item.link);
  popupEditProfile.close();
}

function createCard(data) {
  const card = new Card(data, '#mesto', handleCardClick, async () => {
    try {
      const res = await api.addLike(data._id);
      card.likesCount(res);
    } catch (error) {
      return console.log(`Ошибка: ${error}`);
    }
  }, async () => {
    try {
      const res = await api.removeLike(data._id);
      card.likesCount(res);
    } catch (error) {
      return console.log(`Ошибка: ${error}`);
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

export const popupConfirmation = new PopupConfirmation('.popup_type_confirmation', async (card) => {
  api
    .removeCard(card._id)
    .then(() => {
      card.deleteCard()
      popupConfirmation.close(card)
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
});

popupConfirmation.setEventListeners();

const popupAddCard = new PopupWithForm('#popup_type_new-card', (data) => {
  console.log(data);
  api.addNewCard(data).then(response => cardSection.addItem(createCard(response)));

  popupAddCard.close();
});
popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  cardCreateValidator.resetValidation();
});

fetch('https://mesto.nomoreparties.co/v1/cohort-61/users/me', {
    method: "GET",
    headers: {
      authorization: '8de39d2e-51cd-4fb0-8531-ab4805fcaf6d'
    }
  })
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

api.getInitialData()
  .then(([cards, userInfo]) => {
    const cardsSection = new Section({
        items: cards,
        renderer: (item) => cardsSection.addItem(createCard(item)),
      },
      ".mesta"
    );
    cardsSection.renderItems();
    const profileInfo = new UserInfo({
      nameSelector: '.profile__name',
      infoSelector: '.profile__job'
    });
    profileInfo.setUserInfo(userInfo);
  });