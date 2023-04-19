import {
    popupConfirmation
} from '../pages/index.js';

export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._templateSelector = templateSelector;
        this._image = data.link;
        this._text = data.name;
        this._handleCardClick = handleCardClick;

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
        this._element = null;
    }

    _likeButton() {
        this._buttonLike.classList.toggle('mesto__like_active');
    }

    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.mesto__like');
        this._buttonDelete = this._element.querySelector('.mesto__delete');
        this._popupConfirmation = this._element.querySelector('.popup_type_confirmation');

        this._buttonLike.addEventListener('click', this._likeButton.bind(this));

        this._buttonDelete.addEventListener('click', this._deleteCard.bind(this));

        this._cardImage.addEventListener('click', () => this._handleCardClick({
            name: this._text,
            link: this._image
        }));

    }

}