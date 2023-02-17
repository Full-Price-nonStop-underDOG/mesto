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
        const createTitle = this._element.querySelector('.mesto__title');
        const cardImage = this._element.querySelector('.mesto__img');
        this._setEventListeners();

        createTitle.textContent = this._text;
        cardImage.src = this._image;
        cardImage.alt = this._text;


        return this._element;
    }

    _deleteCard(event) {
        event.target.closest('.mesto').remove();
    }

    _likeButton(event){
        event.target.closest('.mesto__like').classList.toggle('mesto__like_active');
    }

    _setEventListeners() {
        const buttonLike = this._element.querySelector('.mesto__like');
        const buttonDelete = this._element.querySelector('.mesto__delete');
        const cardImage = this._element.querySelector('.mesto__img');

        buttonLike.addEventListener('click', this._likeButton);

        buttonDelete.addEventListener('click', this._deleteCard);

        cardImage.addEventListener('click', () => {
            openPopup(imagePopup);
            
            fullscreenImage.src = this._image;
            fullscreenImage.alt = this._text;
            fullscreenTitle.textContent = this._text;

        });
        

    }

}