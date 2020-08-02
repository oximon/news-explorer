import 'babel-polyfill';

export default class Api {
  constructor(config) {
    this.config = config;
  }

  signin = async (email, password, token) => {
    try {
      const user = await fetch(`${this.config.baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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

  getUserInfo = async (token) => {
    try {
      const userInfo = await fetch(`${this.config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      if (userInfo.ok) {
        return userInfo.json();
      }

      return Promise.reject(`Ошибка: ${userInfo.status}`);
    } catch (err) {
      console.log(err);
    }
  };

  getArticles = async (token) => {
    try {
      const articles = await fetch(`${this.config.baseUrl}/articles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      if (articles.ok) {
        return articles.json();
      }

      return Promise.reject(`Ошибка: ${articles.status}`);
    } catch (err) {
      console.log(err);
    }
  };

  createArticle = async (
    token,
    keyword,
    source,
    title,
    description,
    image,
    date,
    url
  ) => {
    try {
      const article = await fetch(`${this.config.baseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          keyword: keyword,
          title: title,
          text: description,
          date: date,
          source: source,
          link: url,
          image: image,
        }),
      });
      if (article.ok) {
        return article.json();
      }

      return Promise.reject(`Ошибка: ${article.status}`);
    } catch (err) {
      console.log(err);
    }
  };

  deleteArticle = async (id, token) => {
    try {
      const article = await fetch(`${this.config.baseUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });
      if (article.ok) {
        return article.json();
      }

      return Promise.reject(`Ошибка: ${article.status}`);
    } catch (err) {
      console.log(err);
    }
  };
}
