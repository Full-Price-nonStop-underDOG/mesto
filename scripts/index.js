const formEditProfile = document.querySelector('#form-profile');
const formNewCard = document.querySelector('#form__add');
const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 
const formInput = formEditProfile.querySelector('.form__field');

const bigImageCloserEvent = document.querySelector('.popup__container-img');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');

const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const tagInput = document.querySelector('#form__field-card-text');
const imgInput = document.querySelector('#form__field-card-image');

const newName = document.querySelector('.profile__name');
const newJob = document.querySelector('.profile__job');
const profileButtonClose = document.querySelector('.popup__close_profile');
const buttonCloseAdd = document.querySelector('#popup__close');

const userTemplate = document.querySelector('#mesto').content;
const newMesto = document.querySelector('.mesta');
const fullscreenClose = imagePopup.querySelector('.popup__close')


const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenTitle = document.querySelector('.popup__fullscreen-title');

const keyCodeEsc = 27;







function openPopup(popup) {
  popup.classList.add('popup_open')
  popup.querySelector(".form__button").disabled = true; 
}

function closePopup(popup) {
  popup.classList.remove('popup_open')
}






function createCard(item) {
  const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
  const buttonLike = userElement.querySelector('.mesto__like');
  const buttonDelete = userElement.querySelector('.mesto__delete');
  const cardImage = userElement.querySelector('.mesto__img');
  const createTitle = userElement.querySelector('.mesto__title');


  createTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('mesto__like_active');
  });
  buttonDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    fullscreenImage.src = item.link;
    fullscreenImage.alt = item.name;
    fullscreenTitle.textContent = item.name;

  });

  return userElement;
}

function addCard(evt) {
  evt.preventDefault();

  const textValue = tagInput.value;
  const imageValue = imgInput.value;


  const element = createCard({
    name: textValue,
    link: imageValue
  });
  
  newMesto.prepend(element);
  closePopup(cardCreatePopup);
  imgInput.value = '';
  tagInput.value = '';
}

formEditProfile.addEventListener('submit', handleProfileInfo);
formNewCard.addEventListener('submit', addCard);


function handleProfileInfo(evt) {
  evt.preventDefault();

  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(profilePopup);

}

fullscreenClose.addEventListener('click', () => {
  closePopup(imagePopup);

});


buttonEdit.addEventListener('click', () => {
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
  openPopup(profilePopup);
  document.addEventListener('keydown', handleEscClose);
});

buttonAdd.addEventListener('click', () => {

  openPopup(cardCreatePopup);
  document.addEventListener('keydown', handleEscClose);
});


profileButtonClose.addEventListener('click', () => {
  closePopup(profilePopup);
  document.removeEventListener('keydown', handleEscClose)
});

buttonCloseAdd.addEventListener('click', () => {
  closePopup(cardCreatePopup);
  document.removeEventListener('keydown', handleEscClose)
});










import { initialCards } from './constants.js';


function creatingFirstCards(initialCards) {

  initialCards.forEach(item => newMesto.append(createCard(item)));
}

creatingFirstCards(initialCards);





function deleteCard(event) {
  event.target.closest('.mesto').remove();
}








const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const button = formElement.querySelector('.form__button');
  button.classList.add('form__button_disabled');
  inputElement.classList.add('form__field_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__field-error__opacity');
  
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const button = formElement.querySelector('.form__button');
  button.classList.remove('form__button_disabled');
  inputElement.classList.remove('form__field_type_error');
  errorElement.classList.remove('form__field-error__opacity');
  errorElement.textContent = '';
};

 export const checkInputValidity = (formElement, inputElement) => {
  let isValid = true;
  if (!inputElement.validity.valid ){
    showInputError(formElement, inputElement, inputElement.validationMessage);
    isValid = false;
    
  } else {
    hideInputError(formElement, inputElement);
    profilePopup.querySelector(".form__button").disabled = !isValid; 
    cardCreatePopup.querySelector(".form__button").disabled = !isValid;
  }
};
















// Add a click event listener to the document
profilePopup.addEventListener("click", function(event) {
  // Check if the target of the click event is the form or a child of the form
  if (!formEditProfile.contains(event.target)) {
    // Hide the form
    closePopup(profilePopup)
  }
});

cardCreatePopup.addEventListener("click", function(event) {
  
  if (!formNewCard.contains(event.target)) {
    // Hide the form
    closePopup(cardCreatePopup)
  }
});

imagePopup.addEventListener("click", function(event) {
  
  if (!bigImageCloserEvent.contains(event.target)) {
    // Hide the form
    closePopup(imagePopup)
  }
});

function handleEscClose(event){
  
  
    if (event.keyCode == keyCodeEsc) {
      const popupActive = document.querySelector('.popup_open');
      closePopup(popupActive);
      
    }
  
}



function isValidURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + 
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + 
    "((\\d{1,3}\\.){3}\\d{1,3}))" + 
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + 
    "(\\?[;&a-z\\d%_.~+=-]*)?" + 
    "(\\#[-a-z\\d_]*)?$",
    "i"
  ); 
  return !!pattern.test(str);
}


