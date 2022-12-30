let buttonEdit = document.querySelector('.profile__button-edit');
let buttonAdd = document.querySelector('.profile__button-add');
let formEdit = document.querySelector('#popup_type_edit');
let formAdd = document.querySelector('#popup_type_new-card');
let formSubmit = document.querySelector('.form');
let formNewCard = document.querySelector('#form__add');
let nameInput = document.querySelector('.form__field_text_name');
let jobInput = document.querySelector('.form__field_text_job');
let tagInput = document.querySelector('#form__field_text_name');
let imgInput = document.querySelector('#form__field_text_job');


let popupImg = document.querySelector('.popup_img');

let newName = document.querySelector('.profile__name');
let newJob = document.querySelector('.profile__job');
let buttonClose = document.querySelector('.popup__close');
let buttonCloseAdd = document.querySelector('#popup__close');

const userTemplate = document.querySelector('#mesto').content; 
const newMesto = document.querySelector('.mesta');
let popupClose = popupImg.querySelector('.popup__close')








function addCard(evt) {
  evt.preventDefault();
  const userElement = userTemplate.querySelector('.mesto').cloneNode(true);
  let buttonLike = userElement.querySelector('.mesto__like');
  let buttonDelete = userElement.querySelector('.mesto__delete');
  let imgOpen = userElement.querySelector('.mesto__img');
  
  buttonLike.addEventListener('click', () => {
    buttonLike.classList.toggle('mesto__like_active');
  });
  buttonDelete.addEventListener('click', deleteCard);
  
  let img = document.querySelector('.popup__fullscreen-image');
  let title = document.querySelector('popup__fullscreen-title');
  
  userElement.querySelector('.mesto__img').src = imgInput.value;
  userElement.querySelector('.mesto__title').textContent = tagInput.value;
  imgOpen.addEventListener('click', ()=>{
    popupImg.classList.add('popup_open');
    img.src = userElement.querySelector('.mesto__img').src;
    title.textContent = userElement.querySelector('.mesto__title').textContent;
   
  });
  newMesto.append(userElement); 
  
  formAdd.classList.remove('popup_open');
}


function handleFormSubmit(evt) {
  evt.preventDefault();

  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  formEdit.classList.remove('popup_open');
}

popupClose.addEventListener('click', () => {
  popupImg.classList.remove('popup_open')
});



buttonEdit.addEventListener('click', () => {
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
  formEdit.classList.add('popup_open');
});

buttonAdd.addEventListener('click', () => {
  nameInput.value = newName.textContent;
  jobInput.value = newJob.textContent;
  formAdd.classList.add('popup_open');
});





buttonClose.addEventListener('click', () => {
  formEdit.classList.remove('popup_open')
  
});

buttonCloseAdd.addEventListener('click', () => {
  formAdd.classList.remove('popup_open')
  
});

formSubmit.addEventListener('submit', handleFormSubmit);
formNewCard.addEventListener('submit', addCard);


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
    let img = document.querySelector('.popup__fullscreen-image');
    let title = document.querySelector('.popup__fullscreen-title');
    userElement.querySelector('.mesto__img').src = initialCards[i].link;
    userElement.querySelector('.mesto__title').textContent = initialCards[i].name;
    imgOpen.addEventListener('click', ()=>{
      img.src = userElement.querySelector('.mesto__img').src;
      title.textContent = userElement.querySelector('.mesto__title').textContent;
      popupImg.classList.add('popup_open');
    });
    newMesto.append(userElement); 
  }
}

addMesta(initialCards);



function deleteCard(event) {
	event.target.closest('.mesto').remove();
}



