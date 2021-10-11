//import { popupImage, photoGrid,  photoGridTitle, openPopup} from "./index.js";
export default class Card {
  constructor(data, template, { handleCardClick }) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }
/*Private*/
  _getTemplate() {
    const cardElement = this._template.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    cardElement.querySelector(".element__btn-del").addEventListener('click', this._deleteCard);
    cardElement.querySelector(".element__btn-like").addEventListener('click', this._likeCard);
    cardElement.querySelector(".element__image").addEventListener('click', this._handleCardClick);
  }

  _likeCard(evt) {
    evt.target.classList.toggle("element__btn-like_active");
  }

  _deleteCard(evt) {
    let cardToDelete = evt.target.closest(".element");
    cardToDelete.remove();
    cardToDelete = null;
  }

/*Public*/
  generateCard() {
    const cardElement = this._getTemplate();
    cardElement.querySelector(".element__image").src = this._image;
    cardElement.querySelector(".element__image").setAttribute('alt', this._name);
    cardElement.querySelector(".element__title").textContent = this._text;
    this._setEventListeners(cardElement);
    return cardElement;
  }
}










/******************************************************************************/
/******************************************************************************/
/******************************************************************************/
/*
export default class Card {
  constructor(cardData, cardSelector) {
    //console.log("In constructor Card"+cardData.link+"   "+cardSelector)
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._cardTemplate = document.querySelector(this._cardSelector).content.querySelector(".element");
  }

  _getCardTemplate = () => {
    const cardElement = this._cardTemplate.cloneNode(true);
    return cardElement;
  };

  _imagePropertySetup = (imageElement) => {
    imageElement.src = this._link;
    imageElement.alt = this._name;
  };

  _createLike = (likeElement) => {
    //console.log("Like event")
    likeElement.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__btn-like_active");
   });
  };

  _deleteCard = (deleteButtonElement) => {
    deleteButtonElement.addEventListener("click", () => {
      const card = deleteButtonElement.closest(".element");
      this._cardElement.remove();
      this._cardElement = null;
    });
  };

  _createFigurePopup = (imageElement) => {
    imageElement.addEventListener("click", () => {
      photoGrid.src = this._link;
      photoGrid.alt = this._name;
      photoGridTitle.ariaLabel = this._name;
      photoGridTitle.textContent = this._name;
      openPopup(popupImage);
    });
  };

   _setEventListeners = (cardElement, imageElement) => {
    const elementDelBtn = cardElement.querySelector(".element__btn-del");
    const elementLikeBtn = cardElement.querySelector(".element__btn-like");
    this._deleteCard(elementDelBtn);
    this._createLike(elementLikeBtn);
    this._createFigurePopup(imageElement);
  };

  generateCard = () => {
    //console.log("In generate Card")
    this._cardElement = this._getCardTemplate();
    const imageElement = this._cardElement.querySelector(".element__image");
    this._setEventListeners(this._cardElement, imageElement);
    const title = this._cardElement.querySelector(".element__title");
    this._imagePropertySetup(imageElement);
    title.textContent = this._name;
    return this._cardElement;
  };
}*/
