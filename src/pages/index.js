import '../pages/index.css';
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

import {
  initialCards,
  editProfilePopupWindow,
  addImagePopupWindow,
  editBtn,
  addBtn,
  popupImage,
  elementTemplate,
  list,
  profileTitle,
  profileSubtitle,
  inputName,
  inputAbout,
  inputSettings
} from '../utils/constants.js';

export const user = new UserInfo(profileTitle, profileSubtitle);
export const openPicturePopup = new PicturePopup(popupImage);
const editFormValidator = new FormValidator(inputSettings, editProfilePopupWindow);
const cardFormValidator = new FormValidator(inputSettings, addImagePopupWindow);
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

addBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  openAddCardForm.open();
});

editBtn.addEventListener('click', () => {
  editFormValidator.resetValidation();
  const data = user.getUserInfo();
  const { name, about } = data;//destruction
  document.querySelector(inputName).value = name;
  document.querySelector(inputAbout).value = about;
  openProfileForm.open();
});

const openProfileForm = new PopupWithForm({
  popup: editProfilePopupWindow,
  handleSubmitForm: (userInfo) => {
    user.setUserInfo(userInfo);
  },
});

const openAddCardForm = new PopupWithForm({
  popup: addImagePopupWindow,
  handleSubmitForm: (data) => {
    cardList.prependItem(generateCardInstance(data).generateCard());
  },
});

const generateCardInstance = (data) => {
  const cardInstance = new Card(data, elementTemplate, {
    handleCardClick: (evt) => openPicturePopup.open(evt),
  });
  return cardInstance;
};
/*Rendering default Pictures from array*/
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.setItem(generateCardInstance(data).generateCard());
    },
  },
  list
);
cardList.renderer();