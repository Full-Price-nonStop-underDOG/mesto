import {
  UserInfo
} from './UserInfo.js';

import {
  Popup
} from './Popup.js';

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

const formEditProfile = document.querySelector('#form-profile');

export const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const tagInput = document.querySelector('#form__field-card-text');
const imgInput = document.querySelector('#form__field-card-image');

const newName = document.querySelector('.profile__name');
const newJob = document.querySelector('.profile__job');
const profileButtonClose = document.querySelector('.popup__close_profile');
const buttonCloseAdd = document.querySelector('#popup__close');

const cardsContainer = document.querySelector('.mesta');
const fullscreenClose = imagePopup.querySelector('.popup__close')

const formNewCard = document.querySelector('#form__add');
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

function formValues(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput);
  classEditPopup.close();
}



const profileValidator = new FormValidator(config, profilePopup);
profileValidator.enableValidation();

const cardCreateValidator = new FormValidator(config, cardCreatePopup);
cardCreateValidator.enableValidation();


const profileOpen = new PopupWithForm('#popup_type_edit', config.submitButtonSelector);
profileOpen.setEventListeners();

const cardCreateOpen = new PopupWithForm('#popup_type_new-card', config.submitButtonSelector);
cardCreateOpen.setEventListeners();

const imagePopupOpen = new PopupWithImage('.popup_img');
imagePopupOpen.setEventListeners();

// export function openPopup(popup) {
//   popup.classList.add('popup_open');


// }

// export function closePopup(popup) {
//   popup.classList.remove('popup_open');


// }

// function createCard(item) {
//   const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
//   const buttonLike = userElement.querySelector('.mesto__like');
//   const buttonDelete = userElement.querySelector('.mesto__delete');
//   const cardImage = userElement.querySelector('.mesto__img');
//   const createTitle = userElement.querySelector('.mesto__title');

//   createTitle.textContent = item.name;
//   cardImage.src = item.link;
//   cardImage.alt = item.name;

//   buttonLike.addEventListener('click', () => {
//     buttonLike.classList.toggle('mesto__like_active');
//   });
//   buttonDelete.addEventListener('click', deleteCard);
//   cardImage.addEventListener('click', () => {
//     openPopup(imagePopup);
//     document.addEventListener('keydown', handleEscClose);
//     fullscreenImage.src = item.link;
//     fullscreenImage.alt = item.name;
//     fullscreenTitle.textContent = item.name;

//   });

//   return userElement;
// }

export function handleCardClick(item) {

  imagePopupOpen.open(item.name, item.link);

}

function createCard(data) {
  const card = new Card(data, '#mesto', handleCardClick);
  const cardElement = card.generateCard();



  return cardElement;
}

function addCard(evt) {
  evt.preventDefault();

  const textValue = tagInput.value;
  const imageValue = imgInput.value;

  const element = createCard({
    name: textValue,
    link: imageValue
  });

  cardsContainer.prepend(element);
  cardCreateOpen.close();

}

formEditProfile.addEventListener('submit', handleProfileInfo);
formNewCard.addEventListener('submit', addCard);

function handleProfileInfo(data) {

  userInfo.setUserInfo({
    firstName: data.name,
    info: data.info,
  });
  profileOpen.close();
}

// const handleCloseByOverlay = (evt) => {
//   if (evt.target === evt.currentTarget) {
//     imagePopupOpen(evt.currentTarget)
//   }
// }

imagePopup.addEventListener("click", handleCardClick)

fullscreenClose.addEventListener('click', () => {
  imagePopupOpen.close();

});

buttonEdit.addEventListener('click', () => {
  const {
    name,
    info
  } = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = info;

  profileOpen.open();
  profileValidator.resetValidation();

});

buttonAdd.addEventListener('click', () => {
  imgInput.value = '';
  tagInput.value = '';
  cardCreateOpen.open();
  cardCreateValidator.resetValidation();
});

profileButtonClose.addEventListener('click', () => {

  profileOpen.close();

});

buttonCloseAdd.addEventListener('click', () => {
  cardCreateOpen.close();

});


function creatingFirstCards(initialCards) {

  initialCards.forEach(item => cardsContainer.append(createCard(item, '#mesto')));
}

creatingFirstCards(initialCards);

// Add a click event listener to the document
// profilePopup.addEventListener("click", handleCloseByOverlay);

// cardCreatePopup.addEventListener("click", handleCloseByOverlay);

// function handleEscClose(event) {

//   if (event.keyCode == keyCodeEsc) {
//     const popupActive = document.querySelector('.popup_open');
//     closePopup(popupActive);

//   }

// }