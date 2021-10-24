export default class Card {
  constructor(data, template, userId,{ handleCardClick, handleCardDelete, handleCardLike }) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }
/*Private*/
  _getTemplate() {
    const cardElement = this._template.querySelector(".element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardElement.querySelector(".element__btn-del").addEventListener('click', () => {this._handleCardDelete(this._id);});
    this._cardElement.querySelector(".element__btn-like").addEventListener('click', () => {this._handleCardLike(this._id); });
    this._cardElement.querySelector(".element__image").addEventListener('click', () => {this._handleCardClick(this._text, this._image);});
  }

  _setAttributes(cardElement, attributes) {
    for (const key in attributes) {
      cardElement.setAttribute(key, attributes[key]);
    }
  }
  
  _displayDeleteButton() {
    if (this._userId != this._ownerId){
      this._cardElement.querySelector(".element__btn-del").style.display ='none';}
  }

  _populateLikes() {
    this._likes.forEach((like) =>
      like._id === this._userId ? this.likeCard() : this.dislikeCard()
    );
  }
/*Public*/
  generateCard() {
    this._cardElement = this._getTemplate();
    this.likeIcon = this._cardElement.querySelector(".element__btn-like");
    this._setAttributes(this._cardElement.querySelector(".element__image"), {
      src: this._image,
      alt: this._text,
    });
    this._displayDeleteButton();
    this.numOfLikes(this._likes.length);
    this._cardElement.querySelector(".element__title").textContent = this._text;
    this._setEventListeners(this.cardElement);
    this._populateLikes();
    return this._cardElement;
  }
      likeCard() {
        this.likeIcon.classList.add("element__btn-like_active");
      }
      dislikeCard() {
      this.likeIcon.classList.remove("element__btn-like_active");
      }
      deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
      }
      isLiked() {
        return this.likeIcon.classList.contains("element__btn-like_active");
      }
      numOfLikes(number) {
        this._cardElement.querySelector(".element__num-of-likes").textContent = number;
      }
}