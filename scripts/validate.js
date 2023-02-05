const formNewCard = document.querySelector('#form__add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');
const disablecButtonAdd = formNewCard.querySelector(".form__button");
const disablecButtonProfile = profilePopup.querySelector(".form__button");

const config = {
    formSelector: '.form',
    formFields: '.form__field',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: '.form__button_disabled',
    errorField: '.form__field_type_error',
    disabletButtonClass: 'form__button_disabled-add',
    errorOpacity: 'form__field-error__opacity'


}

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.submitButtonSelector);
    button.classList.add(config.disabletButtonClass);
    button.classList.add(config.inactiveButtonClass);
    inputElement.classList.add(config.errorField);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorOpacity);

};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.submitButtonSelector);
    button.classList.remove(config.disabletButtonClass);
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
        

    } else if (!formElement.checkValidity()) {
        hideInputError(formElement, inputElement, config);
        profilePopup.querySelector(config.submitButtonSelector).disabled = !isValid;
        cardCreatePopup.querySelector(config.submitButtonSelector).disabled = !isValid;
        disablecButtonAdd.classList.add(config.disabletButtonClass);
        disablecButtonProfile.classList.add(config.disabletButtonClass);
        
    } else {
        disablecButtonAdd.classList.remove(config.disabletButtonClass);
        disablecButtonProfile.classList.remove(config.disabletButtonClass);
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
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
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

const toggleButtonState = (inputList,formElement, config) => {
    const button = formElement.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButtonClass);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(config.inactiveButtonClassClass);
        button.removeAttribute('disabled');
    }
};




// try something new