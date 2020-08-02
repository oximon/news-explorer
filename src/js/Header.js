export default class Header {
  constructor(item, button, className, logout, logoutLink) {
    this.item = item;
    this.button = button;
    this.className = className;
    this.logout = logout;
    this.logoutLink = logoutLink;
  }

  render(isLoggedIn, name) {
    if (isLoggedIn) {
      this.item.classList.remove(this.className);
      this.button.classList.add(this.className);
      this.logout.classList.remove(this.className);
      this.logoutLink.textContent = name;
    } else {
      this.item.classList.add(this.className);
      this.button.classList.remove(this.className);
      this.logout.classList.add(this.className);
      this.logoutLink.textContent = '';
    }
  }
}
