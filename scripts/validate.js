import { checkInputValidity } from './index.js';

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
    formFields: '.form__field'
  
  }
  
  function enableValidation(){
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      });
  
        setEventListeners(formElement);
    });
  }
  
  enableValidation(obj);
  