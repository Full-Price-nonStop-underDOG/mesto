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


const profileOpen = new PopupWithForm('#popup_type_edit', (data) =>{
  userInfo.setUserInfo(data);
  profileOpen.close();
});
profileOpen.setEventListeners();

buttonEdit.addEventListener('click', ()=>{
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  jobInput.value = dataUser.info;
  profileValidator.resetValidation();
  profileOpen.open();
})

const imagePopupOpen = new PopupWithImage('.popup_img');
imagePopupOpen.setEventListeners();


export function handleCardClick(item) {

  imagePopupOpen.open(item.name, item.link);
  profileOpen.close();
}

function createCard(data) {
  const card = new Card(data, '#mesto', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsSection = new Section(
  { items: initialCards,
    renderer: (item) => cardsSection.addItem(createCard(item)),
  },
  ".mesta"
);
cardsSection.renderItems();
const cardCreateOpen = new PopupWithForm('#popup_type_new-card', (data) =>{
  console.log(data);
  cardsSection.addItem(createCard(data));
  cardCreateOpen.close();
});
cardCreateOpen.setEventListeners();



// function addCard(evt) {
//   evt.preventDefault();

//   const textValue = tagInput.value;
//   const imageValue = imgInput.value;

//   const element = createCard({
//     name: textValue,
//     link: imageValue
//   });

//   cardsContainer.prepend(element);
//   cardCreateOpen.close();

// }

//formNewCard.addEventListener('submit', addCard);

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


// function creatingFirstCards(initialCards) {

//   initialCards.forEach(item => cardsContainer.append(createCard(item, '#mesto')));
// }

// creatingFirstCards(initialCards);

// Add a click event listener to the document
// profilePopup.addEventListener("click", handleCloseByOverlay);

// cardCreatePopup.addEventListener("click", handleCloseByOverlay);

// function handleEscClose(event) {

//   if (event.keyCode == keyCodeEsc) {
//     const popupActive = document.querySelector('.popup_open');
//     closePopup(popupActive);

//   }

// }