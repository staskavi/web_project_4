/**
 * @file index.js is the root file for this app
 * @author StasK.
 */
import './index.css';
import favicon from '../images/favicon.png';
import headerLogoSrc from "../images/Around.svg";
import profileImgSrc from '../images/cousteau.jpg';

document.querySelector("link").href = favicon;
document.querySelector(".header__logo").src = headerLogoSrc;
document.querySelector(".profile__image").src = profileImgSrc;

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PicturePopup from '../components/PicturePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator  from '../components/FormValidator.js';
import API from '../components/Api.js';
import {TOKEN, ADDRESS } from '../utils/constants.js';

import {
  renderLoading,
  editProfilePopupWindow,
  addImagePopupWindow,
  editProfileAvatarBtn,
  editAvatarPopupWindow,
  editBtn,
  addBtn,
  popupImage,
  elementTemplate,
  profileTitle,
  profileSubtitle,
  profileImage,
  inputName,
  inputAbout,
  inputSettings,
  confirmDelImage
} from '../utils/constants.js';

const api = new API({
  baseUrl: ADDRESS,
  headers: {
    authorization: TOKEN,
    'content-type': 'application/json',
  },
});

export const openPicturePopup = new PicturePopup(popupImage);
const editAvatarFormValidator = new FormValidator(inputSettings, editAvatarPopupWindow);
const editFormValidator = new FormValidator(inputSettings, editProfilePopupWindow);
const cardFormValidator = new FormValidator(inputSettings, addImagePopupWindow);

editAvatarFormValidator.enableValidation();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

api.getAll()
.then(([cards, user]) => {
  const profile = new UserInfo(profileTitle, profileSubtitle, profileImage);
  profile.setUserInfo(user);
  const confirmDeletePopup = new PopupWithForm({ popup: confirmDelImage });
  const generateCardInstance = (data) => {
    const cardInstance = new Card(data, elementTemplate, user._id, {
      handleCardClick: (title, image) => {
        openPicturePopup.open(title, image);
      },
      handleCardDelete: (cardId) => {
        confirmDeletePopup.open();
        confirmDeletePopup.setNewHandler(() => {
          api.deleteCard(cardId)
              .then(() => {
              cardInstance.deleteCard();
              confirmDeletePopup.close();
              })
            .catch((err) => console.log(err));
        });
      },
      handleCardLike: (cardId) => {
        const toggleLike = cardInstance.isLiked();
        if (toggleLike) {
          api.dislikeCard(cardId).then((number) => {
            cardInstance.dislikeCard();
            cardInstance.numOfLikes(number.likes.length);
          });
        } else {
          api.likeCard(cardId)
            .then((number) => {
              cardInstance.likeCard();
              cardInstance.numOfLikes(number.likes.length);
            })
            .catch((err) => console.log(err));
        }
      },
    });
    return cardInstance;
  };
  const cardList = new Section(
    {
      items: cards,
      renderer: (data) => {
        cardList.addItem(generateCardInstance(data).generateCard());
      },
    },
    '.elements__list'
  );
  cardList.renderer();
  const openAddCardForm = new PopupWithForm({
    popup: addImagePopupWindow,
    handleSubmitForm: (data) => {
      renderLoading(addImagePopupWindow, true);
      api.addNewCard(data)
        .then((res) => {
          cardList.prependItem(generateCardInstance(res).generateCard());
        })
        .then(() => {
          openAddCardForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(addImagePopupWindow, false));
    },
  });

  addBtn.addEventListener('click', () => {
    cardFormValidator.resetValidation();
    openAddCardForm.open();
  });

  const openProfileForm = new PopupWithForm({
    popup: editProfilePopupWindow,
    handleSubmitForm: (userInfo) => {
      renderLoading(editProfilePopupWindow, true);
      api.updateUserInfo(userInfo)
        .then((result) => {
          profile.setUserInfo(result);
        })
        .then(() => {
          openProfileForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => renderLoading(editProfilePopupWindow, false));
    },
  });

    editBtn.addEventListener('click', () => {
    editFormValidator.resetValidation();
    const { name, about } = profile.getUserInfo();
    document.querySelector(inputName).value = name;
    document.querySelector(inputAbout).value = about;
    openProfileForm.open();
  });

  const openImageEditForm = new PopupWithForm({
    popup: editAvatarPopupWindow,
    handleSubmitForm: (imageUrl) => {
      renderLoading(editAvatarPopupWindow, true);
      api.updateUserImage(imageUrl.avatar)
        .then((res) => {
          profile.setUserInfo(res);
        })
        .then(() => {
          openImageEditForm.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          renderLoading(editAvatarPopupWindow, false);
        });
    },
  });

  editProfileAvatarBtn.addEventListener('click', () => {
     editAvatarFormValidator.resetValidation();
     openImageEditForm.open();
  });
}).catch((err) => console.log(err));
/***********************************************************/