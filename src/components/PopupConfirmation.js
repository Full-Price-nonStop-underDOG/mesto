import { Popup } from "./Popup.js";

function getConfirmation() {}

export class PopupConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popup = document.querySelector(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");

    this._resolve;
    this._reject;
    this._confirmation = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._resolve();
    });
  }

  open() {
    super.open();
    return this._confirmation;
  }

  close() {
    super.close();
  }
}
