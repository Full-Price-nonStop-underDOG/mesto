import { Popup } from "./Popup.js";

export class PopupConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._confirmation = null;
    this._resolve = null;
    this._reject = null;
  }

  open() {
    super.open();
    //В этом коде используется промис для подтверждения действия пользователя в popup.
    // Когда popup открывается, создается новый промис, который будет разрешен только после того,
    // как пользователь совершит подтвержденное действие.
    // Если пользователь не подтверждает действие, промис отклоняется.
    // Промис используется для выполнения различных действий,
    // только после того, как пользователь совершит подтвержденное действие,
    // например, отправку формы или удаление объекта.
    this._confirmation = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._setEventListeners();
    return this._confirmation;
  }

  close() {
    super.close();
    this._reject();
    this._removeEventListeners();
  }

  submitHandler = (evt) => {
    evt.preventDefault();
    this._resolve();
  };

  _setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this.submitHandler);
  }

  _removeEventListeners() {
    this._popupForm.removeEventListener("submit", this.submitHandler);
  }
}
