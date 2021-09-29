import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: "Lago di Braies Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg"
    },
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    }
  ];
const editBtn = document.querySelector(".profile__btn-edit");
const addBtn = document.querySelector(".profile__btn-add");
const editProfilePopupWindow = document.querySelector(".popup-edit");
const addImagePopupWindow = document.querySelector(".popup-add");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const inputName= document.querySelector("#profile-name");
const inputAbout= document.querySelector("#profile-about");
const addTitle= document.querySelector("#title");
const addImageLink= document.querySelector("#image-link");
const formEdit = document.querySelector(".form");
const formAdd = document.querySelector(".form-add");
const list = document.querySelector(".elements__list");
const closeBtnList = document.querySelectorAll(".popup__btn-close");
export const popupImage = document.querySelector(".popup-image");
export const photoGrid = document.querySelector(".popup__image-photo");
export const photoGridTitle = document.querySelector(".popup__image-title");
/*****************************************************************************/
const inputSettings = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__btn-save",
  inactiveButtonClass: "form__btn-save_disabled",
  inputErrorClass: "form__input-texterror",
  errorClass: "form__input-error_active",
};
/**********creating instances of Card class************/
const createElement = (cardData) => new Card(cardData, "#element-template");
const renderElement = (card) => list.prepend(card.generateCard());
initialCards.forEach((cardItem) => {
  //console.log("In forEach loop")
  const card = createElement(cardItem);
  renderElement(card);
});
/**************creating instances of FormValidator Class***********/
const formEditValidator = new FormValidator(inputSettings, formEdit);
const formAddValidator = new FormValidator(inputSettings, formAdd);
formEditValidator.enableValidation();
formAddValidator.enableValidation();
/*****************************************************************/
closeBtnList.forEach((btn) => {
  btn.addEventListener('click', () => {
    closePopup((btn.parentElement).parentElement);//points to parent of parent element to assign the right style for closing popup 
  })
}); 

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent =  inputName.value;
    profileSubtitle.textContent = inputAbout.value;
    closePopup(editProfilePopupWindow);
    }
   
const handleFormAdd = (evt) => {
      evt.preventDefault();
      renderElement(createElement({ name: addTitle.value, link: addImageLink.value }));
      resetForm(formAdd);
      closePopup(addImagePopupWindow);
    };
/************************************************/
export function openPopup(popup){
  console.log("In openPopup Image"+popup)
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', handleEscape);
  document.addEventListener('click', closeOverlayClick);
}

export function closePopup(cardPopup){
  cardPopup.classList.remove("popup_opened");
  document.removeEventListener('keyup', handleEscape);
  document.removeEventListener('click', closeOverlayClick);
}
/************************************************/
function resetForm(form){
  form.reset();
}

function editPopupForm(){
        openPopup(editProfilePopupWindow);
        inputName.value = profileTitle.textContent;
        inputAbout.value = profileSubtitle.textContent;
        formEditValidator.resetValidation(editProfilePopupWindow); 
}

function addPopupForm(){
  openPopup(addImagePopupWindow);
}

/*Edit button*/
editBtn.addEventListener("click", editPopupForm);
/*Add button*/
addBtn.addEventListener("click",addPopupForm);
/*form Edit(Pencil) button*/
formEdit.addEventListener("submit", handleFormSubmit);
/*form Add(plus) button*/
formAdd.addEventListener("submit", handleFormAdd);

const closeOverlayClick = (evt) => {
  isOverlayClicked(evt, closePopup);
};
const isEscEvent = (evt, action) => {
  const activePopup = document.querySelector(".popup_opened");
   //console.log(evt.key);
  if (evt.key === 'Escape') {
    action(activePopup);
  }
};
const handleEscape = (evt) => {
  isEscEvent(evt, closePopup);
};
const isOverlayClicked = (evt, action) => {
  const activePopup = document.querySelector(".popup_opened");

  if (evt.target === activePopup) {
    action(activePopup);
  }
};