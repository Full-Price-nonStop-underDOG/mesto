export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handlePopupClickClose = this._handlePopupClick.bind(this);
  }

  open() {
    this._popup.classList.add("popup_open");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_open");
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handlePopupClick(evt) {
    if (
      evt.target.classList.contains("popup_open") ||
      evt.target.classList.contains("popup__close")
    ) {
      console.log("popup outside click");
      this.close();
    }
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handlePopupClickClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._handlePopupClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
