import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmitForm }) {
    super(popup);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector("form");
    this._inputList = this._popup.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => { this._formValues[input.name] = input.value; });
    return this._formValues;
  }

  setNewHandler(handle) {
    this._handleSubmitForm = handle;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this.handleSubmitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener('submit', this.handleSubmitForm);
  }

  handleSubmitForm = (evt) => {
    evt.preventDefault();
    const inputValues = this._handleSubmitForm(this._getInputValues());
    return inputValues;
  }
}
