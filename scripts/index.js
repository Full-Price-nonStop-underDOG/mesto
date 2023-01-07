const formEditProfile = document.querySelector('#form-profile');
const formNewCard = document.querySelector('#form__add');
const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');

const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const tagInput = document.querySelector('#form__field_card_text');
const imgInput = document.querySelector('#form__field_card_image');




const newName = document.querySelector('.profile__name');
const newJob = document.querySelector('.profile__job');
const profileButtonClose = document.querySelector('.popup__close_profile');
const buttonCloseAdd = document.querySelector('#popup__close');

const userTemplate = document.querySelector('#mesto').content;
const newMesto = document.querySelector('.mesta');
const fullscreenClose = imagePopup.querySelector('.popup__close')


const fullscreenImage = document.querySelector('.popup__fullscreen-image');
const fullscreenTitle = document.querySelector('.popup__fullscreen-title');



function openPopup(popup) {
  popup.classList.add('popup_open')
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
});

buttonAdd.addEventListener('click', () => {

  openPopup(cardCreatePopup);

});





profileButtonClose.addEventListener('click', () => {
  closePopup(profilePopup)
});

buttonCloseAdd.addEventListener('click', () => {
  closePopup(cardCreatePopup)
});




const initialCards = [{
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


function addMesta(initialCards) {

  initialCards.forEach(item => newMesto.append(createCard(item)));
}

addMesta(initialCards);

function deleteCard(event) {
  event.target.closest('.mesto').remove();
}