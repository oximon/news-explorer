import { dateFormat } from './utils';

export default class Article {
  constructor(api) {
    this.api = api;
  }

  createArticle = (source, title, description, image, date, url) => {
    const fragment = document.createDocumentFragment();
    const article = document.createElement('a');
    const articleImage = document.createElement('div');
    const articleIcon = document.createElement('button');
    const articleDescription = document.createElement('div');
    const articleDate = document.createElement('p');
    const articleTitle = document.createElement('h3');
    const articleText = document.createElement('p');
    const articleSource = document.createElement('p');

    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleIcon.classList.add('article__icon', 'article__icon_type_save');
    articleDescription.classList.add('article__description');
    articleDate.classList.add('article__date');
    articleTitle.classList.add('article__title');
    articleText.classList.add('article__text');
    articleSource.classList.add('article__source');

    fragment.appendChild(article);
    article.appendChild(articleImage);
    article.appendChild(articleDescription);
    articleImage.appendChild(articleIcon);
    articleDescription.appendChild(articleDate);
    articleDescription.appendChild(articleTitle);
    articleDescription.appendChild(articleText);
    articleDescription.appendChild(articleSource);

    article.setAttribute('href', url);
    article.setAttribute('target', '_blank');

    articleImage.setAttribute('style', `background-image: url('${image}')`);

    articleTitle.textContent = title;
    articleText.textContent = description;
    articleDate.textContent = dateFormat(date);
    articleSource.textContent = source;

    return fragment;
  };

  deleteArticle = () => {};

  addToFavorites = () => {};
}
