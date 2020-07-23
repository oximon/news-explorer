export default class Popup {
  constructor(container) {
    this.container = container;
  }

  toggle = () => {
    this.container.classList.toggle('popup_is-opened');
  };

  addListeners = () => {
    this.container
      .querySelector('.popup__close')
      .addEventListener('click', () => {
        this.toggle();
      });
  };
}
