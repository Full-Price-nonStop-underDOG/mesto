import { Api } from "../components/Api.js";

import { elementsApi } from "../scripts/constants.js";
const api = new Api(elementsApi);

import { userId } from "../pages/index.js";

const hasUserLikes = (likes, userId) =>
  likes.some((like) => userId === like._id);

export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    popupConfirmation,
    userId
  ) {
    this._templateSelector = templateSelector;
    this._popupConfirmation = popupConfirmation;
    this._image = data.link;
    this._text = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".mesto")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const titleName = this._element.querySelector(".mesto__title");
    this._cardImage = this._element.querySelector(".mesto__img");
    this._likesCount = this._element.querySelector(".mesto__amount-like");
    this._buttonDelete = this._element.querySelector(".mesto__delete");
    this._setEventListeners();

    titleName.textContent = this._text;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this.likesCount(this._likes.length);
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
    return this._element;
  }

  likesCount(count) {
    this._likes = count;
    this._likesCount.textContent = count;

    // this._likeDislike();
  }

  _likeDislike() {
    const likesUser = this._likes.some((like) => like._id === this._userId);
    if (likesUser) {
      // this._likeButton()
    } else {
      // this._unlikeButton()
    }

    this.likesCount.textContent = this._likes.length;
  }

  _handleDeleteIconClick() {
    this._popupConfirmation.open(this);
  }

  setDeleteIconClickHandler() {
    console.log(this._buttonDelete);
    //this._buttonDelete = card.querySelector('.mesto__delete');
    this._buttonDelete.addEventListener("click", () => {
      this._popupConfirmation.open(card);
    });
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // _likeButton() {
  //     this._buttonLike.classList.add('mesto__like_active');

  //     async () => {
  //         try {
  //             const res = await api.addLike(data._id);
  //             likesCount(res);
  //             console.log('set like')
  //         } catch (error) {
  //             return console.log(`Ошибка: ${error}`);
  //         }
  //     }
  // }

  async _likeButton() {
    try {
      //this._buttonLike.classList.toggle('mesto__like_active');
      const { likes } = await api.addLike(this._id);

      this.likesCount(likes.length);
      if (hasUserLikes(likes, userId)) {
        this._buttonLike.classList.toggle("mesto__like_active");
      } else {
        this._buttonLike.classList.toggle("mesto__like_active");
      }
      console.log("set like");
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  }

  async _unlikeButton() {
    try {
      //this._buttonLike.classList.remove('mesto__like_active');
      const { likes } = await api.removeLike(this._id);
      this.likesCount(likes.length);
      if (hasUserLikes(likes, userId)) {
        this._buttonLike.classList.remove("mesto__like_active");
      } else {
        this._buttonLike.classList.toggle("mesto__like_active");
      }
      console.log("set dislike");
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  }

  // _unlikeButton() {
  //     this._buttonLike.classList.remove('mesto__like_active');
  //     async () => {
  //         try {
  //             const res = await api.removeLike(data._id);
  //             likesCount(res);
  //             console.log('set like')
  //         } catch (error) {
  //             return console.log(`Ошибка: ${error}`);
  //         }
  //     }
  // }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".mesto__like");

    this._buttonLike.addEventListener("click", () => {
      if (this._buttonLike.classList.contains("mesto__like_active")) {
        this._unlikeButton();
      } else {
        this._likeButton();
      }
    });

    this._buttonDelete.addEventListener("click", () => {
      console.log("START POPUP.");
      this._popupConfirmation
        .open()
        .then(() => {
          this.deleteCard();
          this._popupConfirmation.close();
          // delete this._id
          console.log("delete card");
          document.removeEventListener("keydown", this._handleEscClose);
        })
        .catch(() => {
          // do nothing
          console.log("do not delete card");
        });
    });

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({
        name: this._text,
        link: this._image,
      })
    );
  }
}
