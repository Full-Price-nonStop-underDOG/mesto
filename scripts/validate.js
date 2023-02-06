const formNewCard = document.querySelector('#form__add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');
const disablecButtonAdd = formNewCard.querySelector(".form__button");
const disablecButtonProfile = profilePopup.querySelector(".form__button");

const config = {
    formSelector: '.form',
    formFields: '.form__field',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    errorField: '.form__field_type_error',
    
    errorOpacity: 'form__field-error_visible'


}

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.submitButtonSelector);
    
    button.classList.add(config.inactiveButtonClass);
    inputElement.classList.add(config.errorField);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorOpacity);

};

  const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.submitButtonSelector);
    
    button.classList.remove(config.inactiveButtonClass);
    inputElement.classList.remove(config.errorField);
    errorElement.classList.remove(config.errorOpacity);
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    let isValid = true;
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
        isValid = false;
        

    } else  {
        hideInputError(formElement, inputElement, config);
        formElement.querySelector(config.submitButtonSelector).disabled = !isValid;
        disableButton(formElement);
        
        
    } 




};


const setEventListeners = (formElement) => {
   
    const inputList = Array.from(formElement.querySelectorAll(config.formFields));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, formElement, config);
        });
    });
};



function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    
    formList.forEach((formElement) => {
        
        disableButton(formElement);
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
            disableButton(formElement);
        });
        
      
        setEventListeners(formElement);
    });
}

enableValidation(config);



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function disableButton(formElement){
    formElement.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
}

const toggleButtonState = (inputList,formElement, config) => {
    const button = formElement.querySelector(config.submitButtonSelector);
    disableButton(formElement)
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.removeAttribute('disabled');
    }
};




// try something new