let buttonEdit = document.querySelector('.profile__button-edit');
let form = document.querySelector('.popup');
let formSubmit = document.querySelector('.form')
let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');
let newName = document.querySelector('.profile__name');
let newJob = document.querySelector('.profile__job');
let buttonClose = document.querySelector('.popup__close');


function handleFormSubmit(evt) {
  evt.preventDefault();



  newName.textContent = nameInput.value;
  newJob.textContent = jobInput.value;
  form.classList.remove('popup_open')

}

buttonEdit.addEventListener('click', () => {
  form.classList.add('popup_open');
});

buttonClose.addEventListener('click', () => {
  form.classList.remove('popup_open')
});

formSubmit.addEventListener('submit', handleFormSubmit);