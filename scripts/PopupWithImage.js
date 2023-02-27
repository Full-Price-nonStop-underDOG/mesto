import{
    Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
      super(popupSelector);
      this._imageElement = this._popupElement.querySelector('.mesto__img');
      this._captionElement = this._popupElement.querySelector('.mesto__title');
    }
  
    open(imageSrc, imageCaption) {
      this._imageElement.src = imageSrc;
      this._captionElement.textContent = imageCaption;
      super.open();
    }
  }
  