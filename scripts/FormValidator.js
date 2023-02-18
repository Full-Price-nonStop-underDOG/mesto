export class FormValidator {
  constructor(config, formElement) {
    this._formElement = formElement;
    this._config = config;
    this._formSelector = config.formSelector;
    this._formFields = config.formFields;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorField = config.errorField;
    this._errorOpacity = config.errorOpacity;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._errorField);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorOpacity);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._errorField);
    errorElement.classList.remove(this._errorOpacity);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  _setEventListeners() {
   this._inputList = Array.from(this._formElement.querySelectorAll(this._formFields));
    
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleButtonState()
  } 

  enableValidation() {
    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    this._setEventListeners();
   
  }
}

//   class FormValidator{
//     constructor(config, validationForm, showInputError, hideInputError){
//       this._validationForm = validationForm;  
//       this._showInputError = showInputError;
//       this._hideInputError = hideInputError;
//       this._formSelector = config.formSelector;
//       this._formFields = config.formFields;
//       this._submitButtonSelector = config.submitButtonSelector;
//       this._inactiveButtonClass = config.inactiveButtonClass;
//       this._errorField = config.errorField;
//       this._errorOpacity = config.errorOpacity;  

//     }

//      _checkInputValidity = (validationForm, inputElement) => {
//         let isValid = true;

//         if (!inputElement.validity.valid) {
//             this._showInputError(validationForm, inputElement, inputElement.validationMessage, config);
//             isValid = false;

//         } else  {
//             this._hideInputError(validationForm, inputElement, config);
//             formElement.querySelector(config.submitButtonSelector).disabled = !isValid;
//             this._disableButton(validationForm);

//         } 

//     };

//      _setEventListeners = (validationForm) => {

//         const inputList = Array.from(validationForm.querySelectorAll(config.formFields));
//         inputList.forEach((inputElement) => {
//             inputElement.addEventListener('input', function () {
//                 checkInputValidity(validationForm, inputElement);
//                 toggleButtonState(inputList, validationForm, config);
//             });
//         });
//     };

//      enableValidation(config) {
//         const formList = Array.from(document.querySelectorAll(config.formSelector));

//         formList.forEach((validationForm) => {

//             this._disableButton(validationForm);
//             validationForm.addEventListener('submit', (evt) => {
//                 evt.preventDefault();

//                 this._disableButton(validationForm);
//             });

//             setEventListeners(validationForm);
//         });
//     }

//     FormValidator.enableValidation(config);

//     function validationForm(){
//         const thisForm = new FormValidator.enableValidation(config);

//     }

//     // enableValidation(config);

//     _hasInvalidInput = (inputList) => {
//         return inputList.some((inputElement) => {
//             return !inputElement.validity.valid;
//         });
//     };

//      _disableButton(validationForm){
//         validationForm.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
//     }

//      _toggleButtonState = (inputList,validationForm, config) => {
//         const button = validationForm.querySelector(config.submitButtonSelector);
//         this._disableButton(validationForm)
//         if (hasInvalidInput(inputList)) {
//             button.classList.add(config.inactiveButtonClass);
//             button.setAttribute('disabled', true);
//         } else {
//             button.classList.remove(config.inactiveButtonClass);
//             button.removeAttribute('disabled');
//         }
//     };

// }

// const showInputError = (formElement, inputElement, errorMessage, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     const button = formElement.querySelector(config.submitButtonSelector);

//     button.classList.add(config.inactiveButtonClass);
//     inputElement.classList.add(config.errorField);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(config.errorOpacity);

// };

//   const hideInputError = (formElement, inputElement, config) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     const button = formElement.querySelector(config.submitButtonSelector);

//     button.classList.remove(config.inactiveButtonClass);
//     inputElement.classList.remove(config.errorField);
//     errorElement.classList.remove(config.errorOpacity);
//     errorElement.textContent = '';
// };

// FormValidator.enableValidation(config);

// const checkInputValidity = (formElement, inputElement) => {
//     let isValid = true;

//     if (!inputElement.validity.valid) {
//         showInputError(formElement, inputElement, inputElement.validationMessage, config);
//         isValid = false;

//     } else  {
//         hideInputError(formElement, inputElement, config);
//         formElement.querySelector(config.submitButtonSelector).disabled = !isValid;
//         disableButton(formElement);

//     } 

// };

// const setEventListeners = (formElement) => {

//     const inputList = Array.from(formElement.querySelectorAll(config.formFields));
//     inputList.forEach((inputElement) => {
//         inputElement.addEventListener('input', function () {
//             checkInputValidity(formElement, inputElement);
//             toggleButtonState(inputList, formElement, config);
//         });
//     });
// };

// function enableValidation(config) {
//     const formList = Array.from(document.querySelectorAll(config.formSelector));

//     formList.forEach((formElement) => {

//         disableButton(formElement);
//         formElement.addEventListener('submit', (evt) => {
//             evt.preventDefault();

//             disableButton(formElement);
//         });

//         setEventListeners(formElement);
//     });
// }

// enableValidation(config);

// const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//         return !inputElement.validity.valid;
//     });
// };

// function disableButton(formElement){
//     formElement.querySelector(config.submitButtonSelector).classList.add(config.inactiveButtonClass);
// }

// const toggleButtonState = (inputList,formElement, config) => {
//     const button = formElement.querySelector(config.submitButtonSelector);
//     disableButton(formElement)
//     if (hasInvalidInput(inputList)) {
//         button.classList.add(config.inactiveButtonClass);
//         button.setAttribute('disabled', true);
//     } else {
//         button.classList.remove(config.inactiveButtonClass);
//         button.removeAttribute('disabled');
//     }
// };

// try something new