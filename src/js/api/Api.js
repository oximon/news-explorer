import 'babel-polyfill';

export default class Api {
  constructor(config) {
    this.config = config;
  }

  signin = async (email, password) => {
    try {
      const user = await fetch(`${this.config.baseUrl}/signin`, {
        method: 'POST',
        headers: this.config.headers,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (user.ok) {
        return user.json();
      }

      return Promise.reject(`Ошибка: ${user.status}`);
    } catch (err) {
      console.log(err);
    }
  };

  signup = async (email, password, name) => {
    try {
      const user = await fetch(`${this.config.baseUrl}/signup`, {
        method: 'POST',
        headers: this.config.headers,
        body: JSON.stringify({
          password: password,
          name: name,
          email: email,
        }),
      });
      if (user.ok) {
        return user.json();
      }

      return Promise.reject(`Ошибка: ${user.status}`);
    } catch (err) {
      console.log(err);
    }
  };

  getUserInfo = async () => {
    try {
      const userInfo = await fetch(`${this.config.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.config.headers,
        credentials: 'include',
        withCredentials: true,
      });
      if (userInfo.ok) {
        return userInfo.json();
      }

      return Promise.reject(`Ошибка: ${userInfo.status}`);
    } catch (err) {
      console.log(err);
    }
  }

}
