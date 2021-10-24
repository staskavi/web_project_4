import Popup from './Popup.js';

export default class PicturePopup extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image-photo");
    this._title = this._popup.querySelector(".popup__image-title");
  }
  
  open(title, image) {
    super.open();
    this._image.setAttribute('src', image);
    this._image.setAttribute('alt', title);
    this._title.textContent = title;
  }
}