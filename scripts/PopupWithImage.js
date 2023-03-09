import{
    Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._popupElement = document.querySelector(popupSelector);
      this._imageElement = this._popupElement.querySelector('.popup__fullscreen-image');
      this._captionElement = this._popupElement.querySelector('.popup__fullscreen-title');
    }
  
    open(name, link) {
      this._captionElement.textContent = name;
      this._imageElement.src = link;
      super.open();
    }

    close(){
      super.close();
    }
  }
  