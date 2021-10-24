export const TOKEN = '064fc825-8a38-497e-b79d-9599b0efc019';
export const ADDRESS = 'https://around.nomoreparties.co/v1/group-12';
//Render Loading
export const renderLoading = (popup, isloading) => {
  const submitBtn = popup.querySelector('.form__btn-save');
  !isloading
    ? (submitBtn.textContent = 'Save')
    : (submitBtn.textContent = 'Loading...');
};
//Form Settings
export const inputSettings = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__btn-save",
    inactiveButtonClass: "form__btn-save_disabled",
    inputErrorClass: "form__input-texterror",
    errorClass: "form__input-error_active",
  };
//Other constants
export const togglePopupClass = "popup_opened";
export const closePopupButton = ".popup__btn-close";
export const list = ".elements__list";
export const profileTitle = ".profile__title";
export const profileSubtitle = ".profile__subtitle";
export const profileImage = ".profile__image";
export const inputName = ".profile-name";
export const inputAbout = ".profile-about";
export const editBtn = document.querySelector(".profile__btn-edit");
export const addBtn = document.querySelector(".profile__btn-add");
export const editProfilePopupWindow = document.querySelector(".popup-edit");
export const addImagePopupWindow = document.querySelector(".popup-add");
export const popupImage = document.querySelector(".popup-image");
export const elementTemplate = document.querySelector("#element-template").content;
export const editAvatarPopupWindow = document.querySelector(".popup-change-profile-img");
export const editProfileAvatarBtn = document.querySelector('.profile__btn-avatar-edit');
export const confirmDelImage = document.querySelector(".popup-del-card");