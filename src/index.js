import './pages/index.css';
import Popup from './js/Popup';
import FormValidator from './js/FormValidator';
import Api from './js/api/Api';
import config from './js/config';
import NewsApi from './js/api/NewsApi';
import Article from './js/Article';
import ArticleList from './js/ArticleList';
import { dateChanger } from './js/utils';
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

const api = new Api(config);
const newsapi = new NewsApi(config);

const articleList = new ArticleList(
  articleContainer,
  new Article(newsapi),
  newsapi,
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

formSignin.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const res = await api.signin(
      formSignin.elements.email.value,
      formSignin.elements.password.value,
    );
    api.getUserInfo();
    const flagLoggedIn = false;
    const itemHide = document.querySelector('#item_hide');

    if (flagLoggedIn === true) {
      itemHide.classList.remove('header__item_hide');
      toSigninButton.textContent = 'Злата';
      const logoutImage = document.createElement('div');
      logoutImage.classList.add('header__logoutImage');
      toSigninButton.appendChild(logoutImage);
    }
  } catch (err) {
    console.log(err);
  }
});

formSignup.addEventListener('submit', (e) => {
  e.preventDefault();
  api.signup(
    formSignup.elements.email.value,
    formSignup.elements.password.value,
    formSignup.elements.name.value,
  );
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
