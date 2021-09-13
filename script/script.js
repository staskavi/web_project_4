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
const elementTemplate = document.querySelector("#element-template").content.querySelector(".element");//accessing to content of template element
const popupImage = document.querySelector(".popup-image");
const photoGrid = document.querySelector(".popup__image-photo");
const photoGridTitle = document.querySelector(".popup__image-title");
/*************Show cards from array of cards********************/
initialCards.forEach((card) => {
  list.prepend(createElement(card.name, card.link));
});
/***************************************************************/
const closeBtnList = document.querySelectorAll(".popup__btn-close");

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
function handleFormAdd(evt) {
    evt.preventDefault();
    list.prepend(createElement(addTitle.value, addImageLink.value)); //insert before elements
    resetForm(formAdd);
    closePopup(addImagePopupWindow);
    
    }
/****************************************************************/
function openPopup(popup){
  popup.classList.add("popup_opened");
  document.addEventListener('keyup', handleEscape);
  document.addEventListener('click', closeOverlayClick);
}

function closePopup(cardPopup){
  cardPopup.classList.remove("popup_opened");
  document.removeEventListener('keyup', handleEscape);
  document.removeEventListener('click', closeOverlayClick);
}

function resetForm(form){
  form.reset();
}

function editPopupForm(){
        openPopup(editProfilePopupWindow);
        inputName.value = profileTitle.textContent;
        inputAbout.value = profileSubtitle.textContent;
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

/*****************************************************************************************/
function createElement(name, link) {

    const elementCard = elementTemplate.cloneNode(true);// cloning the element with all its content 
    const elementImage = elementCard.querySelector(".element__image");
    const elementDelBtn = elementCard.querySelector(".element__btn-del");
    const elementTitle = elementCard.querySelector(".element__title");
    const elementLikeBtn = elementCard.querySelector(".element__btn-like");
    elementTitle.textContent = name;
    elementImage.src = link;
    elementImage.alt = name;
    elementDelBtn.addEventListener("click", function() {
      const listItem = elementDelBtn.closest('.element');
      listItem.remove();
    })
    elementLikeBtn.addEventListener("click", function(evt) {
        evt.target.classList.toggle("element__btn-like_active");//like button on/off
    })
    elementImage.addEventListener("click", () => {
     // let image = document.querySelector(".popup__image-photo");
     // let title = document.querySelector(".popup__image-title");
      photoGrid.src = link;
      photoGrid.alt = name;
      photoGridTitle.textContent = name;
      openPopup(popupImage);
    });
    return elementCard;
}
/************************************************************************/

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