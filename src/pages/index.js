import '../pages/index.css';

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
} from '../scripts/constants.js'

export const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const tagInput = document.querySelector('#form__field-card-text');
const imgInput = document.querySelector('#form__field-card-image');

const profileButtonClose = document.querySelector('.popup__close_profile');
const buttonCloseAdd = document.querySelector('#popup__close');

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

const profileValidator = new FormValidator(config, profilePopup);
profileValidator.enableValidation();

const cardCreateValidator = new FormValidator(config, cardCreatePopup);
cardCreateValidator.enableValidation();

const popupEditProfile = new PopupWithForm('#popup_type_edit', (data) => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
});
popupEditProfile.setEventListeners();

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
  const card = new Card(data, '#mesto', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// const cardsSection = new Section({
//     items: api.getData(),
//     renderer: (item) => cardsSection.addItem(createCard(item)),
//   },
//   ".mesta"
// );
// cardsSection.renderItems();
const popupAddCard = new PopupWithForm('#popup_type_new-card', (data) => {
  console.log(data);
  cardsSection.addItem(createCard(data));
  popupAddCard.close();
});
popupAddCard.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddCard.open();
  cardCreateValidator.resetValidation();
});

// fetch('https://nomoreparties.co/v1/cohort-61/users/me', {
//     headers: {
//       authorization: '8de39d2e-51cd-4fb0-8531-ab4805fcaf6d'
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Ошибка HTTP: ' + response.status);
//     }
//     return response.text();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });

async function fetchDataFromServer() {
  try {
    const response = await fetch('https://nomoreparties.co/v1/cohort-61/cards', {
          headers: {
             authorization: '8de39d2e-51cd-4fb0-8531-ab4805fcaf6d'
           }
         });
    const data = await response.json();
    return data;
  } catch(error) {
    console.error('Ошибка при получении данных:', error);
    return null;
  }
}

async function loadDataAndRenderCards() {
  const cardsData = await fetchDataFromServer();
  if (cardsData) {
    cardsData.renderItems();
  }
}

loadDataAndRenderCards();