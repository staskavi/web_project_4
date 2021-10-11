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
    const elementImage = cardElement.querySelector(".element__image");
    elementImage.src = this._image;
    elementImage.setAttribute('alt', this._name);
    cardElement.querySelector(".element__title").textContent = this._text;
    this._setEventListeners(cardElement);
    return cardElement;
  }
}