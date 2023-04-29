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

// async function loadInitialCards() {
//   try {
//     const cards = await api.getInitialCardsData();
//     console.log(cards);
//     cards.forEach((card) => {
//       initialCardsSection.addItem(createCard(card, userId));
//     });

//     initialCardsSection.renderItems();

//     cardsSection.renderItems();
//   } catch (error) {
//     console.log(`Ошибка: ${error}`);
//   }
// }

// loadInitialCards();

const profileValidator = new FormValidator(config, profilePopup);
profileValidator.enableValidation();

const cardCreateValidator = new FormValidator(config, cardCreatePopup);
cardCreateValidator.enableValidation();

const profileAvatarValidator = new FormValidator(config, avatarPopup);
profileAvatarValidator.enableValidation();

const popupEditProfile = new PopupWithForm("#popup_type_edit", (data) => {
  handleEditProfileSubmit(data);
  // popupEditProfile.close();
});
popupEditProfile.setEventListeners();

const popupAvatar = new PopupWithForm(
  ".popup_type_update-avatar",
  handleSubmitFormUpdateAvatar
);
popupAvatar.setEventListeners();

async function handleSubmitFormUpdateAvatar(data) {
  popupAvatar.changeTextSubmitSave(popupAvatar);
  try {
    try {
      console.log("cshhchs");
      const userProfile = await api.updateProfileUserAvatar(data);
      userInfo.setUserInfo(userProfile);
      popupAvatar.close();
    } catch (error) {
      return console.log(`Ошибка: ${error}`);
    }
  } finally {
    popupAvatar.resetSubmitTextToDefault(popupAvatar);
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
  popupEditProfile.changeTextSubmitSave(popupEditProfile);
  try {
    try {
      await api.editProfileInfo(formData).then((formData) => {
        userInfo.setUserInfo(formData);
        popupEditProfile.close();
      });
    } catch (error) {
      return console.log(`Ошибка: ${error}`);
    }
  } finally {
    popupEditProfile.resetSubmitTextToDefault(popupEditProfile);
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
popupImage.setEventListeners();

function handleCardClick(item) {
  popupImage.open(item.name, item.link);
}
const initialCardsSection = new Section(
  {
    items: [], // начальный пустой массив
    renderer: (item) => {
      const card = createCard(item, userId);
      initialCardsSection.addItem(card);
    },
  },
  ".mesta"
);

const onDelete = async (id) => {
  const popupConfirmation = new PopupConfirmation(".popup_type_confirmation");
  popupConfirmation.setEventListeners();
  await popupConfirmation.open();
  const response = await api.removeCard(id);

  popupConfirmation.close();
  return !!response;
};

const onLike = async (id) => {
  const response = await api.addLike(id);
  console.log(response);
  return response;
};

const onDislike = async (id) => {
  const response = await api.removeLike(id);
  console.log(response);
  return response;
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
  popupAddCard.changeTextSubmitSave(popupAddCard);

  try {
    await api
      .addNewCard(data)
      .then((response) =>
        initialCardsSection.addItem(createCard(response, userId))
      );

    popupAddCard.close();
  } catch (error) {
    return console.log(`Ошибка: ${error}`);
  } finally {
    popupAddCard.resetSubmitTextToDefault(popupAddCard);
  }
}

const popupAddCard = new PopupWithForm(
  "#popup_type_new-card",
  handleAddCardSubmit
);
popupAddCard.setEventListeners();

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  cardCreateValidator.resetValidation();
});

api.getInitialData().then(([cards, data]) => {
  cards.forEach((card) => {
    initialCardsSection.addItem(createCard(card, userId));
  });
  initialCardsSection.renderItems();

  userInfo.setUserInfo(data);
});

Promise.all([api.getUserInfo(), api.getInitialCardsData()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    initialCardsSection.renderItems(
      cards.map((card) => createCard(card, userId))
    );
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
