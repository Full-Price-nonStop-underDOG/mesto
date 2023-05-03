export class Card {
  constructor(data, templateSelector, handleCardClick, userId, callbacks) {
    this._templateSelector = templateSelector;

    this._image = data.link;
    this._text = data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    // console.log(this._userId, this._ownerId, this._userId === this._ownerId);

    this._handleCardClick = handleCardClick;
    this._onDeleteCallback = callbacks.onDelete;
    this._onLikeCallback = callbacks.onLike;
    this._onDislikeCallback = callbacks.onDislike;
    //this.content = ths.generateCard();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".mesto")
      .cloneNode(true);

    return cardElement;
  }

  hasUserLikes() {
    return this._likes.some((like) => this._userId === like._id);
  }

  generateCard() {
    this._element = this._getTemplate();
    const titleName = this._element.querySelector(".mesto__title");
    this._cardImage = this._element.querySelector(".mesto__img");
    this._countLikes = this._element.querySelector(".mesto__amount-like");
    this._buttonDelete = this._element.querySelector(".mesto__delete");
    this._setEventListeners();

    titleName.textContent = this._text;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this.countLikes(this._likes.length);
    console.log(this._userId, this._likes);
    if (this.hasUserLikes()) {
      this._buttonLike.classList.toggle("mesto__like_active");
    }
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
    return this._element;
  }

  countLikes(count) {
    this._countLikes.textContent = count;

    // this._likeDislike();
  }

  deleteCard() {
    console.log("delete this shit");
    this._element.remove();
    //this._element = null;
  }

  async likeButton(updateLikes) {
    try {
      //const { likes } = await callback(this._id);
      this.countLikes(updateLikes.length);
      this._buttonLike.classList.toggle("mesto__like_active");
      console.log("like");
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  }

  async unlikeButton(updateLikes) {
    try {
      //const { likes } = await callback(this._id);

      this.countLikes(updateLikes.length);

      this._buttonLike.classList.toggle("mesto__like_active");

      console.log("set dislike");
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector(".mesto__like");

    this._buttonLike.addEventListener("click", async () => {
      console.log("CLIIIIIck");
      if (this._buttonLike.classList.contains("mesto__like_active")) {
        try {
          const response = await this._onDislikeCallback(this._id);
          console.log("dis");
          this.unlikeButton(response.likes);
        } catch (error) {
          console.error("Error while disliking:", error);
        }
      } else {
        try {
          const response = await this._onLikeCallback(this._id);
          this.likeButton(response.likes);
        } catch (error) {
          console.error("Error while liking:", error);
        }
      }
    });

    this._buttonDelete.addEventListener("click", async () => {
      try {
        const isSuccess = await this._onDeleteCallback(this._id);
        if (isSuccess) {
          this.deleteCard();
        }
      } catch (error) {
        console.error("Error while deleting card:", error);
      }
    });

    this._cardImage.addEventListener("click", () =>
      this._handleCardClick({
        name: this._text,
        link: this._image,
      })
    );
  }
}
