let buttonEdit = document.querySelector('.profile__button-edit');
let form = document.querySelector('.popup');

buttonEdit.addEventListener('click', () => {
  form.classList.add('open');
});

let buttonClose = document.querySelector('.popup__close');
buttonClose.addEventListener('click', () =>{
    form.classList.remove('open')
});





let nameInput = document.querySelector('.form__input-name');
let jobInput = document.querySelector('.form__input-job');


function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let name = nameInput.value;
    console.log(name);
    let job = jobInput.value;
    let newName = document.querySelector('.profile__name');
    let newJob = document.querySelector('.profile__job');

    newName.textContent = name;
    newJob.textContent = job;

}
form.addEventListener('submit', handleFormSubmit); 