import '../pages/index.css';

import {
  UserInfo
} from './UserInfo.js';

import {
  Section
} from './Section.js';

import {
  PopupWithImage
} from './PopupWithImage.js';

import {
  PopupWithForm
} from './PopupWithForm.js';

import {
  initialCards
} from './constants.js';

import {
  FormValidator
} from './FormValidator.js';

import {
  Card
} from './Card.js';

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

const fullscreenClose = imagePopup.querySelector('.popup__close')

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

const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => cardsSection.addItem(createCard(item)),
  },
  ".mesta"
);
cardsSection.renderItems();
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

