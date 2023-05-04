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
    // В данном случае когда попап открывается - промис возвращает resolve
    // в index.js (120) await popupConfirmation.open(); благодаря чему выполняется последующий код
    // из try. если же попап закрывается без сабмита - в промис записывается реджект
    // и последующий код из try пропускается и выполняется catch (это можно проверить с помощью дебагера)
    //
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
