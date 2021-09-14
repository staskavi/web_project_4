const input = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__btn-save",
    inactiveButtonClass: "form__btn-save_disabled",
    inputErrorClass: "form__input-texterror",
    errorClass: "form__input-error_active",
  };
  
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(input.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(input.errorClass);
  };
  
  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(input.inputErrorClass);
    errorElement.classList.remove(input.errorClass);
    errorElement.textContent = "";
  };
  
  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);
  
  const toggleButtonState = (inputList, buttonElement) => {
    //console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(input.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(input.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
  
  const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(input.inputSelector));
    const buttonElement = formElement.querySelector(input.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(input.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
  enableValidation(input);
  