const formNewCard = document.querySelector('#form__add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');
const disablecButtonAdd = formNewCard.querySelector(".form__button");

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector('.form__button');
    disablecButtonAdd.classList.add('form__button_disabled-add');
    button.classList.add('form__button_disabled');
    inputElement.classList.add('form__field_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__field-error__opacity');
    
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector('.form__button');
    disablecButtonAdd.classList.remove('form__button_disabled-add');
    button.classList.remove('form__button_disabled');
    inputElement.classList.remove('form__field_type_error');
    errorElement.classList.remove('form__field-error__opacity');
    errorElement.textContent = '';
  };
  

const checkInputValidity = (formElement, inputElement) => {
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


const setEventListeners = (formElement) => {
  
    const inputList = Array.from(formElement.querySelectorAll(obj.formFields));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
         checkInputValidity(formElement, inputElement);
        
      });
    });
  };
  
  const obj = {
    formSelector: '.form',
    formFields: '.form__field',
    buttonEl: '.form__button',
    inactiveButton: '.form__button_disabled'
  
  }
  
  function enableValidation(obj){
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
  
        setEventListeners(formElement);
    });
  }
  
  enableValidation(obj);

  const hasInvalidInput = (inputs) => {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputs, buttonEl, obj) => {
    if (hasInvalidInput(inputs)) {
    buttonEl.classList.add(obj.inactiveButton);
    buttonEl.setAttribute('disabled', true);
  } else {
    buttonEl.classList.remove(obj.inactiveButtonClass);
    buttonEl.removeAttribute('disabled');
    }
  };
  
  