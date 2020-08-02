/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import './pages/index.css';
import Popup from './js/Popup';
import FormValidator from './js/FormValidator';
import Api from './js/api/Api';
import config from './js/config';
import NewsApi from './js/api/NewsApi';
import Article from './js/Article';
import ArticleList from './js/ArticleList';
import Header from './js/Header';
import { dateChanger } from './js/utils/utils';
import { pageSize, toDate } from './js/constants/constants';

const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Некорректный Email',
};
const dateTo = toDate.toISOString();
const dateFrom = dateChanger(toDate, -7);

const articleContainer = document.querySelector('#container');

const successResults = document.querySelector('#successResults');
const loadingResults = document.querySelector('#loadingResults');
const failResults = document.querySelector('#failResults');

const formSignin = document.forms.signin;
const formSignup = document.forms.signup;

const signinButton = document.querySelector('#signinButton');
const signupButton = document.querySelector('#signupButton');
const searchButton = document.querySelector('#searchButton');

const searchInput = document.querySelector('#searchInput');

const toSigninButton = document.querySelector('#toSigninButton');
const toSignup = document.querySelector('#toSignup');
const toSignin = document.querySelector('#toSignin');
const toSigninSuccess = document.querySelector('#toSigninSuccess');

let token = localStorage.getItem('token');
let flagLoggedIn = false;

const api = new Api(config);
const newsapi = new NewsApi(config);

const article = new Article(api);
const articleList = new ArticleList(
  articleContainer,
  new Article(api),
  newsapi,
  document.querySelector('#showMore'),
);

const signinPopup = new Popup(document.querySelector('.popup_signin'));
const signupPopup = new Popup(document.querySelector('.popup_signup'));
const successPopup = new Popup(document.querySelector('.popup_success'));

const signinValidator = new FormValidator(
  formSignin,
  signinButton,
  errorMessages,
);

const signupValidator = new FormValidator(
  formSignup,
  signupButton,
  errorMessages,
);

signinValidator.setEventListeners();
signupValidator.setEventListeners();

toSigninButton.addEventListener('click', () => {
  signinPopup.toggle();
});

toSignup.addEventListener('click', () => {
  signinPopup.toggle();
  signupPopup.toggle();
});

toSignin.addEventListener('click', () => {
  signupPopup.toggle();
  signinPopup.toggle();
});

toSigninSuccess.addEventListener('click', () => {
  successPopup.toggle();
  signinPopup.toggle();
});

signinPopup.addListeners();
signupPopup.addListeners();
successPopup.addListeners();

articleList.addListeners();

const header = new Header(
  document.querySelector('#item_hide'),
  document.querySelector('#toSigninItem'),
  'header__item_hide',
  document.querySelector('#logout'),
  document.querySelector('#logoutLink'),
);

if (token) {
  try {
    api.getUserInfo(token).then((userInfo) => {
      flagLoggedIn = true;
      header.render(flagLoggedIn, userInfo.data.name);
    });
  } catch (err) {
    console.log(err);
  }
}

formSignin.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    token = await api.signin(
      formSignin.elements.email.value,
      formSignin.elements.password.value,
    );
    flagLoggedIn = true;
    localStorage.setItem('token', token.token);
    const userInfo = await api.getUserInfo(token.token);
    header.render(flagLoggedIn, userInfo.data.name);
    signinPopup.toggle();
    article.renderIcons(flagLoggedIn, null, 'article__icon_type_save');
  } catch (err) {
    console.log(err);
  }
});

document.querySelector('#logout').addEventListener('click', () => {
  flagLoggedIn = false;
  localStorage.removeItem('token');
  header.render(flagLoggedIn, null);
});

formSignup.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await api.signup(
      formSignup.elements.email.value,
      formSignup.elements.password.value,
      formSignup.elements.name.value,
    );
    signupPopup.toggle();
    successPopup.toggle();
  } catch (err) {
    console.log(err);
  }
});

searchButton.addEventListener('click', async (e) => {
  e.preventDefault();
  successResults.classList.remove('results_type_success');
  failResults.classList.remove('results_type_fail');

  while (articleContainer.firstChild) {
    articleContainer.removeChild(articleContainer.firstChild);
  }

  try {
    loadingResults.classList.add('results_type_loading');
    const list = await articleList.renderApi(
      searchInput.value,
      dateTo,
      dateFrom,
      pageSize,
    );

    article.renderIcons(flagLoggedIn, null, 'article__icon_type_save');

    if (list === false) {
      loadingResults.classList.remove('results_type_loading');
      failResults.classList.add('results_type_fail');
      return;
    }
    loadingResults.classList.remove('results_type_loading');
    successResults.classList.add('results_type_success');
  } catch (err) {
    console.log(err);
  }
});

// header //

const hamburger = document.querySelector('#hamburger');

const nav = document.querySelector('#nav');
const navigation = document.querySelector('#navigation');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('header__nav_hide');
  navigation.classList.toggle('header__navigation_dark');
  if (!navigation.classList.contains('header__navigation_dark')) {
    hamburger.setAttribute('src', './images/menu.png');
  } else {
    hamburger.setAttribute('src', './images/close.png');
  }
});
