const formNewCard = document.querySelector('#form__add');
const profilePopup = document.querySelector('#popup_type_edit');
const cardCreatePopup = document.querySelector('#popup_type_new-card');
const disablecButtonAdd = formNewCard.querySelector(".form__button");


const config = {
    formSelector: '.form',
    formFields: '.form__field',
    buttonEl: '.form__button',
    inactiveButton: '.form__button_disabled',
    errorField: '.form__field_type_error'


}

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.buttonEl);
    disablecButtonAdd.classList.add('form__button_disabled-add');
    button.classList.add(config.inactiveButton);
    inputElement.classList.add(config.errorField);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__field-error__opacity');

};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    const button = formElement.querySelector(config.buttonEl);
    disablecButtonAdd.classList.remove('form__button_disabled-add');
    button.classList.remove(config.inactiveButton);
    inputElement.classList.remove(config.errorField);
    errorElement.classList.remove('form__field-error__opacity');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    let isValid = true;
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
        isValid = false;
        

    } else if (!formElement.checkValidity()) {
        hideInputError(formElement, inputElement, config);
        profilePopup.querySelector(config.buttonEl).disabled = !isValid;
        cardCreatePopup.querySelector(config.buttonEl).disabled = !isValid;
        disablecButtonAdd.classList.add('form__button_disabled-add');
        
    } else {
        disablecButtonAdd.classList.remove('form__button_disabled-add');
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
    const button = formElement.querySelector(config.buttonEl);
    if (hasInvalidInput(inputList)) {
        button.classList.add(config.inactiveButton);
        button.setAttribute('disabled', true);
    } else {
        button.classList.remove(config.inactiveButtonClass);
        button.removeAttribute('disabled');
    }
};




// try something new