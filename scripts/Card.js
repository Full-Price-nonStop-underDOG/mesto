import {
    imagePopup
} from "./index.js";
import {
    closePopup,
    openPopup
} from "./index.js";
import {
    fullscreenImage,
    fullscreenTitle,
    bigImageCloserEvent
} from './index.js';

export class Card {
    constructor(data, templateSelector) {
        this._templateSelector = templateSelector;
        this._image = data.link;
        this._text = data.name;
        
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
        const titleName = this._element.querySelector('.mesto__title');
        this._cardImage = this._element.querySelector('.mesto__img');
        this._setEventListeners();

        titleName.textContent = this._text;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;


        return this._element;
    }

    _deleteCard() {
        this._element.remove();
    }

    _likeButton(){
        this._buttonLike.classList.toggle('mesto__like_active');
    }

    

    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.mesto__like');
        this._buttonDelete = this._element.querySelector('.mesto__delete');

        this._buttonLike.addEventListener('click', this._likeButton.bind(this));

        this._buttonDelete.addEventListener('click', this._deleteCard.bind(this));

        this._cardImage.addEventListener('click', () => {
            openPopup(imagePopup);
            
            fullscreenImage.src = this._image;
            fullscreenImage.alt = this._text;
            fullscreenTitle.textContent = this._text;

        });
        
    }

}