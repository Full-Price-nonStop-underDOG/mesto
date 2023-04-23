import {
    Popup
} from './Popup.js';

export class PopupConfirmation extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector)
        this._submitHandler = submitHandler;
        this._popup = document.querySelector(popupSelector);
        this._popupForm = this._popup.querySelector(".popup__form");
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault()
            this._submitHandler(this._card)
        });
    }

    open(card) {
        this._card = card
        super.open()
    }

    close(card) {
        this._card = card
        super.close()
    }
}