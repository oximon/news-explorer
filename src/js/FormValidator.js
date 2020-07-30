export default class FormValidator {
  constructor(form, button, errorMessage) {
    this.form = form;
    this.button = button;
    this.errorMessage = errorMessage;
  }

  _checkInputValidity = (input, error) => {
    for (let key in this.errorMessage) {
      if (input.validity[key]) {
        return (error.textContent = this.errorMessage[key]);
      }
    }
    error.textContent = "";
  };

  _setSubmitButtonState = () => {
    if (!this.form.checkValidity()) {
      this._buttonDissable();
    } else this_.buttonEnable();
  };

  setEventListeners = () => {
    this.form.addEventListener("input", event => {
      this._checkInputValidity(event.target, event.target.nextElementSibling);
      this._setSubmitButtonState();
    });
  };

  _buttonEnable = () => {
    this.button.removeAttribute("disabled");
    this.button.classList.remove("popup__button_is-disabled");
    this.button.classList.add("popup__button_is-enabled");
  };

  _buttonDissable = () => {
    this.button.setAttribute("disabled", true);
    this.button.classList.add("popup__button_is-disabled");
    this.button.classList.remove("popup__button_is-enabled");
  };
}
