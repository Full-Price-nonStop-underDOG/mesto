 import { deleteCard } from "./index.js";
 import { imagePopup } from "./index.js";
 import { closePopup } from "./index.js";

    const fullscreenImage = document.querySelector('.popup__fullscreen-image');
    const fullscreenTitle = document.querySelector('.popup__fullscreen-title');
    const bigImageCloserEvent = document.querySelector('.popup__container-img');
 
 export class Card{
    constructor(data, templateSelector, handleEscClose, openPopup){
        this._templateSelector = templateSelector;
        this._image = data.link;
        this._text = data.name;
        this._openPopup = openPopup;
        this._handleEscClose = handleEscClose;
    }
  
    _getTemplate() {
        const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.mesto')
          .cloneNode(true);
    
        return cardElement;
      }
  
       generateCard() {
        this._element = this._getTemplate();
        const createTitle = this._element.querySelector('.mesto__title');
        const cardImage = this._element.querySelector('.mesto__img');
        this._setEventListeners();
    
        createTitle.textContent = this._text;
        cardImage.src = this._image;
        cardImage.alt = this._text;
  
    
        return this._element;
      }
  
      
      
      _setEventListeners() {
        const buttonLike = this._element.querySelector('.mesto__like');
        const buttonDelete = this._element.querySelector('.mesto__delete');
        const cardImage = this._element.querySelector('.mesto__img');
        
  
  
  
        this._element.addEventListener('click', () => {
          this._openPopup(imagePopup);
        });
  
        buttonLike.addEventListener('click', () => {
          buttonLike.classList.toggle('mesto__like_active');
        });
  
        buttonDelete.addEventListener('click', deleteCard);
  
        cardImage.addEventListener('click', () => {
          this._openPopup(imagePopup);
          document.addEventListener('keydown', this._handleEscClose);
          fullscreenImage.src = this._image;
          fullscreenImage.alt = this._text;
          fullscreenTitle.textContent = this._text;
      
        });
        imagePopup.addEventListener("click", function(event) {
    
          if (!bigImageCloserEvent.contains(event.target)) {
            // Hide the form
            closePopup(imagePopup);
            
          }
        });
  
      }
  
      
  
  }

  
  