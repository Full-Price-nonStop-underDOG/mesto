import {
    popupConfirmation
} from '../pages/index.js';

export class Card {
    constructor(data, templateSelector, handleCardClick, like, dislike, popupConfirmation) {
        this._templateSelector = templateSelector;
        this._popupConfirmation = popupConfirmation;
        this._image = data.link;
        this._text = data.name;
        this._likes = data.likes;
        this._id = data.id;
        this._ownerId = data.owner.id;
        this._like = like;
        this._dislike = dislike;
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
        this._likesCount = this._element.querySelector(".mesto__amount-like");

        this._setEventListeners();
       

        titleName.textContent = this._text;
        this._cardImage.src = this._image;
        this._cardImage.alt = this._text;

        this._likeDislike();
        return this._element;

    }

    likesCount(result) {
        this._likes = result.likes
        this._likeDislike()
    }

    _likeDislike() {
        const likesUser = this._likes.some(like => like._id === this._userId)
        if (likesUser) {
            this._likeButton()
        } else {
            this._unlikeButton()
        }
        this._likesCount.textContent = this._likes.length
    }

    _handleDeleteIconClick() {
        this._popupConfirmation.open(this);
    }

    setDeleteIconClickHandler(card) {
        this._buttonDelete = card.querySelector('.mesto__delete');
        this._buttonDelete.addEventListener('click', () => {
            this._popupConfirmation.open(card);
        });
      }

    _deleteCard() {

        this._element.remove();
        this._element = null;
    }

    _likeButton() {
        this._buttonLike.classList.toggle('mesto__like_active');
    }

    _unlikeButton() {
        this._buttonLike.classList.toggle('mesto__like_active');
    }

    _setEventListeners() {
        this._buttonLike = this._element.querySelector('.mesto__like');
       
        this._popupConfirmation = this._element.querySelector('.popup_type_confirmation');

        this._buttonLike.addEventListener("click", () => {
            if (this._buttonLike.classList.contains("mesto__like_active")) {
                this._dislike()
            } else {
                this._like()
            }
        });

        this._cardImage.addEventListener('click', () => this._handleCardClick({
            name: this._text,
            link: this._image
        }));

    }

}