import Popup from './Popup.js';

export default class PicturePopup extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector(".popup__image-photo");
    this._title = this._popup.querySelector(".popup__image-title");
  }

  open(evt) {
    const targetSrc = evt.target.parentElement.querySelector(".element__image").getAttribute('src');
    const targetName = evt.target.parentElement.querySelector(".element__title").textContent;
    this._image.setAttribute('src', targetSrc);
    this._image.setAttribute('alt', targetName);
    this._title.textContent = targetName;
    super.open();
  }
}