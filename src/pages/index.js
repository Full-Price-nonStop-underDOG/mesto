import "../pages/index.css";

import { PopupConfirmation } from "../components/PopupConfirmation.js";

import { UserInfo } from "../components/UserInfo.js";

import { Section } from "../components/Section.js";

import { PopupWithImage } from "../components/PopupWithImage.js";

import { PopupWithForm } from "../components/PopupWithForm.js";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";

import { Api } from "../components/Api.js";

import { elementsApi, config } from "../scripts/constants.js";

export const imagePopup = document.querySelector(".popup_img");
// Переменные для всех трех попапов

const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAdd = document.querySelector(".profile__button-add");
const nameInput = document.querySelector(".form__field_text_name");
const avatarInput = document.querySelector(".form__field_text_avatar");
const jobInput = document.querySelector(".form__field_text_job");
const profilePopup = document.querySelector("#popup_type_edit");
const cardCreatePopup = document.querySelector("#popup_type_new-card");
const avatarPopup = document.querySelector(".popup_type_update-avatar");
const fullscreenImage = document.querySelector(".popup__fullscreen-image");
const fullscreenTitle = document.querySelector(".popup__fullscreen-title");
const bigImageCloserEvent = document.querySelector(".popup__container-img");
const buttonEditAvatar = document.querySelector(".profile__edit-avatar");

let userId;

export { fullscreenImage, fullscreenTitle, bigImageCloserEvent };

const userInfo = new UserInfo({
  name: ".profile__name",
  about: ".profile__job",
  avatar: ".profile__avatar",
});

const api = new Api(elementsApi);

const profileValidator = new FormValidator(config, profilePopup);
profileValidator.enableValidation();

const cardCreateValidator = new FormValidator(config, cardCreatePopup);
cardCreateValidator.enableValidation();

const profileAvatarValidator = new FormValidator(config, avatarPopup);
profileAvatarValidator.enableValidation();

const popupEditProfile = new PopupWithForm(
  "#popup_type_edit",
  handleEditProfileSubmit
  // popupEditProfile.close();
);
// popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm(
  ".popup_type_update-avatar",
  handleSubmitFormUpdateAvatar
);
// popupAvatar.setEventListeners();

async function handleSubmitFormUpdateAvatar(data) {
  try {
    console.log("cshhchs");
    const userProfile = await api.updateProfileUserAvatar(data);
    userInfo.setUserInfo(userProfile);
    popupAvatar.close();
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
}

buttonEditAvatar.addEventListener("click", () => {
  popupAvatar.open();
  profileAvatarValidator.resetValidation();
  //profileAvatarValidator.resetValidation();
  // const userAvatar = userInfo.getUserInfo();
  // avatarInput.value = dataUser.name;
});

async function handleEditProfileSubmit(formData) {
  try {
    await api.editProfileInfo(formData).then((formData) => {
      userInfo.setUserInfo(formData);
      popupEditProfile.close();
    });
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  }
}

buttonEdit.addEventListener("click", () => {
  const dataUser = userInfo.getUserInfo();
  nameInput.value = dataUser.name;
  jobInput.value = dataUser.about;
  profileValidator.resetValidation();
  popupEditProfile.open();
});

const popupImage = new PopupWithImage(".popup_img");
// popupImage.setEventListeners();

function handleCardClick(item) {
  popupImage.open(item.name, item.link);
}
const initialCardsSection = new Section(
  {
    renderer: (container) => (content) => {
      container.prepend(content);
    },
  },
  ".mesta"
);
const popupConfirmation = new PopupConfirmation(".popup_type_confirmation");

const onDelete = async (id) => {
  try {
    await popupConfirmation.open();

    const response = await api.removeCard(id);

    if (!response) {
      throw new Error("fewfwefwefewf");
    }
    popupConfirmation.close();

    return true;
  } catch (error) {
    return false;
  }
};

const onLike = async (id) => {
  try {
  } catch (error) {
    console.log(error);
  }
  const response = await api.addLike(id);
  console.log(response);
  return response;
};

const onDislike = async (id) => {
  try {
    const response = await api.removeLike(id);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

function createCard(data, uId) {
  const card = new Card(data, "#mesto", handleCardClick, uId, {
    onDelete,
    onLike,
    onDislike,
  });

  // card.setDeleteIconClickHandler();
  const cardElement = card.generateCard();

  return cardElement;
}

async function handleAddCardSubmit(data) {
  try {
    await api
      .addNewCard(data)
      .then((response) =>
        initialCardsSection.addItem(createCard(response, userId))
      );

    popupAddCard.close();
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
}

const popupAddCard = new PopupWithForm(
  "#popup_type_new-card",
  handleAddCardSubmit
);
// popupAddCard.setEventListeners();

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();

  cardCreateValidator.resetValidation();
});

api
  .getInitialData()
  .then(([cards, data]) => {
    const { _id: id } = data;
    const cardElements = cards.map((card) => createCard(card, id));
    initialCardsSection.addItems(cardElements);
    userId = id;
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
