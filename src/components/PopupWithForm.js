import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
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

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      console.log("submit");
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
    // debugger;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  changeTextSubmitSave(popup) {
    popup._submitButton.textContent = "Сохранение...";
  }

  resetSubmitTextToDefault(popup) {
    popup._submitButton.textContent = "Сохранить";
  }
}
