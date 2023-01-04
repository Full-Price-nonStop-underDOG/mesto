const formSubmit = document.querySelector('.form');
const formNewCard = document.querySelector('#form__add');
const imagePopup = document.querySelector('.popup_img');
// Переменные для всех трех попапов 

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
const profilePopup = document.querySelector('#popup_type_edit');
const addNewCardPopup = document.querySelector('#popup_type_new-card');

const nameInput = document.querySelector('.form__field_text_name');
const jobInput = document.querySelector('.form__field_text_job');
const tagInput = document.querySelector('#form__field_text_name');
const imgInput = document.querySelector('#form__field_text_job');




const newName = document.querySelector('.profile__name');
const newJob = document.querySelector('.profile__job');
const profileButtonClose = document.querySelector('.popup__close_profile');
const buttonCloseAdd = document.querySelector('#popup__close');

const userTemplate = document.querySelector('#mesto').content; 
const newMesto = document.querySelector('.mesta');
const popupClose = imagePopup.querySelector('.popup__close')

const massiveImage = document.querySelector('.popup__fullscreen-image');
const massiveTitle = document.querySelector('.popup__fullscreen-title');
const addImage = document.querySelector('.popup__fullscreen-image');
const addTitle = document.querySelector('.popup__fullscreen-title');



function openPopup(event){
  event.classList.add('popup_open')
}

function closePopup(event){
  event.classList.remove('popup_open')
}


function createCard(event){
  event.preventDefault();
  const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
  
  
  imgOpen.src = imgInput.value;
  userElement.querySelector('.mesto__title').textContent = tagInput.value;
  cardEventListeners(userElement);
  return userElement;
  
}

function cardEventListeners(userElement){
  const buttonLike = userElement.querySelector('.mesto__like');
  const buttonDelete = userElement.querySelector('.mesto__delete');
  const imgOpen = userElement.querySelector('.mesto__img');

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('mesto__like_active');
  });
  
  buttonDelete.addEventListener('click', deleteCard);

  imgOpen.addEventListener('click', ()=>{
    imagePopup.classList.add('popup_open');
    addImage.src = userElement.querySelector('.mesto__img').src;
    addTitle.textContent = userElement.querySelector('.mesto__title').textContent;
  });
}

function addscard(userElement){
  evt.preventDefault();
  newMesto.prepend(userElement); 
  

  closePopup(addNewCardPopup);
  imgInput.value = '';
  tagInput.value = '';
}

formSubmit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', addscard);



function handleFormSubmit(evt) {
  evt.preventDefault();

  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  closePopup(profilePopup);
  
}

popupClose.addEventListener('click', () => {
  closePopup(imagePopup);
  
});



buttonEdit.addEventListener('click', () => {
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
  openPopup(profilePopup);
});

buttonAdd.addEventListener('click', () => {
  
  openPopup(addNewCardPopup);
  
});





profileButtonClose.addEventListener('click', () => {
  closePopup(profilePopup)
});

buttonCloseAdd.addEventListener('click', () => {
  closePopup(addNewCardPopup)
});




const initialCards = [
  {
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





function addMesta(initialCards){
  for (let i = 0; i < initialCards.length; i++) {
    const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
    let buttonLike = userElement.querySelector('.mesto__like');
    
    let buttonDelete = userElement.querySelector('.mesto__delete');
    let imgOpen = userElement.querySelector('.mesto__img');
    
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('mesto__like_active');
  });
  buttonDelete.addEventListener('click', deleteCard);
    
    userElement.querySelector('.mesto__img').src = initialCards[i].link;
    userElement.querySelector('.mesto__title').textContent = initialCards[i].name;
    imgOpen.addEventListener('click', ()=>{
      massiveImage.src = initialCards[i].link;
      massiveTitle.textContent = initialCards[i].name;
      
      openPopup(imagePopup);
    });
    newMesto.append(userElement); 
  }
}

addMesta(initialCards);



function deleteCard(event) {
	event.target.closest('.mesto').remove();
}



