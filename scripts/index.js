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



function createCard(item){
  const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
  const buttonLike = userElement.querySelector('.mesto__like');
  const buttonDelete = userElement.querySelector('.mesto__delete');
  const createImage  = userElement.querySelector('.mesto__img');
  const createTitle = userElement.querySelector('.mesto__title');
  const imgOpen = userElement.querySelector('.mesto__img');
  
  createTitle.textContent = item.name;
  createImage.src = item.link;

  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('mesto__like_active');
  });
  buttonDelete.addEventListener('click', deleteCard);
  imgOpen.addEventListener('click', ()=>{
    imagePopup.classList.add('popup_open');
    addImage.src = userElement.querySelector('.mesto__img').src;
    addTitle.textContent = userElement.querySelector('.mesto__title').textContent;
   
  });

  return userElement;
}

function addCard(evt) {
  evt.preventDefault();
   
  const textValue = tagInput.value;
  const imageValue = imgInput.value;


  const element = createCard({ name: textValue, link: imageValue });
  newMesto.prepend(element);
  closePopup(addNewCardPopup);
  imgInput.value = '';
  tagInput.value = '';
}

formSubmit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', addCard);



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
    const textValue = initialCards[i].name;
    const imageValue = initialCards[i].link;
    const element = createCard({ name: textValue, link: imageValue });
    
    
    
    newMesto.append(element); 
  }
}

addMesta(initialCards);



function deleteCard(event) {
	event.target.closest('.mesto').remove();
}



