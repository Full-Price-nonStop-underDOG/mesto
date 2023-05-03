import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._selector = popupSelector;
    this._submitHandler = submitHandler;

    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._formElement.querySelectorAll(".form__field");
    this._submitButton = this._formElement.querySelector(".form__button");
  }

  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  _setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setSubmitListener() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.changeTextSubmitSave();
      this._submitHandler(this._getInputValues())
        .then(() => {
          this.resetSubmitTextToDefault();
          this.close();
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  changeTextSubmitSave() {
    this._setSubmitButtonText("Сохранение...");
  }

  resetSubmitTextToDefault() {
    this._setSubmitButtonText("Сохранить");
  }
}
