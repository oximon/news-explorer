import { dateFormat, showKeywords } from './utils/utils';

export default class Article {
  constructor(api) {
    this.api = api;
  }

  createArticle = (
    source,
    title,
    description,
    image,
    date,
    url,
    id,
    keyword
  ) => {
    const fragment = document.createDocumentFragment();
    const article = document.createElement('div');
    const articleImage = document.createElement('div');
    const articleIcon = document.createElement('button');
    const articleDescription = document.createElement('div');
    const articleDate = document.createElement('p');
    const articleTitle = document.createElement('h3');
    const articleText = document.createElement('p');
    const articleSource = document.createElement('p');
    const articleLink = document.createElement('a');

    article.classList.add('article');
    articleImage.classList.add('article__image');
    articleIcon.classList.add(
      'article__icon',
      'article__icon_type_save',
      'article__icon_type_UnhoveredSave'
    );
    articleDescription.classList.add('article__description');
    articleDate.classList.add('article__date');
    articleTitle.classList.add('article__title');
    articleText.classList.add('article__text');
    articleSource.classList.add('article__source');
    articleLink.classList.add('article__link');

    fragment.appendChild(article);
    article.appendChild(articleIcon);
    article.appendChild(articleLink);
    articleLink.appendChild(articleImage);
    articleLink.appendChild(articleDescription);
    articleDescription.appendChild(articleDate);
    articleDescription.appendChild(articleTitle);
    articleDescription.appendChild(articleText);
    articleDescription.appendChild(articleSource);

    articleLink.setAttribute('href', url);
    articleLink.setAttribute('target', '_blank');

    articleImage.setAttribute('style', `background-image: url('${image}')`);

    articleTitle.textContent = title;
    articleText.textContent = description;

    if (id) {
      articleDate.textContent = date;
    } else {
      articleDate.textContent = dateFormat(date);
    }

    articleSource.textContent = source;
    article.id = id;

    const articleKeyword = document.createElement('p');
    articleKeyword.classList.add('article__keyword');
    articleKeyword.textContent = keyword;
    article.appendChild(articleKeyword);

    return fragment;
  };

  renderIcons = (flag, add, remove) => {
    if (flag) {
      const icons = [...document.querySelectorAll('.article__icon')];
      icons.forEach((icon) => {
        icon.classList.remove(remove);
        icon.classList.add(add);
      });
    }
  }

  deleteArticle = async (event) => {
    const token = localStorage.getItem('token');
    try {
      if (event.target.classList.contains('article__icon_type_delete')) {
        const deletedArticle = await this.api.deleteArticle(
          event.target.closest('.article').id,
          token
        );
        if (deletedArticle) {
          event.target.closest('.article').remove();
          this.api.getArticles(token).then((articles) => {
            document.querySelector('#amountArticles').textContent =
              articles.data.length;
              showKeywords(articles.data);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  addToFavorites = async (event) => {
    const token = localStorage.getItem('token');
    try {
      if (
        event.target.classList.contains('article__icon') &&
        !event.target.classList.contains('article__icon_type_delete')
      ) {
        const article = event.target.closest('.article');
        if (!event.target.classList.contains('article__icon_type_marked')) {
          const createdArticle = await this.api.createArticle(
            token,
            document.querySelector('#searchInput').value,
            article.querySelector('.article__source').textContent,
            article.querySelector('.article__title').textContent,
            article.querySelector('.article__description').textContent,
            article
              .querySelector('.article__image')
              .getAttribute('style')
              .slice(23, -2),
            article.querySelector('.article__date').textContent,
            article.querySelector('.article__link').getAttribute('href')
          );
          if (createdArticle) {
            article
              .querySelector('.article__icon')
              .classList.remove(
                'article__icon_type_save',
                'article__icon_type_UnhoveredSave'
              );
            article
              .querySelector('.article__icon')
              .classList.add('article__icon_type_marked');
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
}
