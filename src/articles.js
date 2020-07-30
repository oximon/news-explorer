/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import './pages/articles.css';

import config from './js/config';
import Api from './js/api/Api';
import Header from './js/Header';
import ArticleList from './js/ArticleList';
import Article from './js/Article';
import { keywordsSort, showKeywords } from './js/utils/utils';

const api = new Api(config);
const article = new Article(api);
const articleList = new ArticleList(
  document.querySelector('#savedContainer'),
  new Article(api),
  null,
);
articleList.addListeners();

const header = new Header(
  document.querySelector('#item_hide'),
  document.querySelector('#toSigninItem'),
  'header__item_hide',
  document.querySelector('#logout'),
  document.querySelector('#logoutLink'),
);

const token = localStorage.getItem('token');
let flagLoggedIn = false;

if (token) {
  try {
    api.getUserInfo(token).then((userInfo) => {
      flagLoggedIn = true;
      header.render(flagLoggedIn, userInfo.data.name);
      document.querySelector('#userName').textContent = userInfo.data.name;
    });
    api
      .getArticles(token)
      .then((articles) => {
        document.querySelector('#amountArticles').textContent = articles.data.length;
        articleList.renderNews(articles.data);
        showKeywords(articles.data);
      })
      .then(() => {
        article.renderIcons(
          flagLoggedIn,
          'article__icon_type_delete',
          'article__icon_type_save',
        );
      });
  } catch (err) {
    console.log(err);
  }
}

if (!token) {
  document.location.href = '/';
}

document.querySelector('#logout').addEventListener('click', () => {
  flagLoggedIn = false;
  localStorage.removeItem('token');
  document.location.href = '/';
  header.render(flagLoggedIn, null);
});

// header //

const hamburger = document.querySelector('#hamburger');

const nav = document.querySelector('#nav');
const navigation = document.querySelector('#navigation');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('header__nav_hide');
  navigation.classList.toggle('header__navigation_dark');
  if (!navigation.classList.contains('header__navigation_dark')) {
    hamburger.setAttribute('src', './images/menu-dark.png');
    document
      .querySelector('.header__logo-text')
      .setAttribute('style', 'color: #000');
  } else {
    hamburger.setAttribute('src', './images/close.png');
    document.querySelectorAll('.header__link').forEach((el) => {
      el.classList.remove('header__link_color_black');
      el.classList.add('header__link_color_white');
    });
    document
      .querySelector('.header__logo-text')
      .setAttribute('style', 'color: #fff');
    document
      .querySelector('#logoutLink')
      .classList.add('header__link_border-white', 'header__link_after')
      .remove('header__link_border-black', 'header__link_after-black');
  }
});
