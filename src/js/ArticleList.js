import 'babel-polyfill';

export default class ArticleList {
  constructor(container, article, api, button) {
    this.container = container;
    this.article = article;
    this.api = api;
    this.button = button;
  }

  _addArticle = ({
    source,
    title,
    description,
    image,
    date,
    url,
    id,
    keyword,
  }) => {
    return this.container.appendChild(
      this.article.createArticle(
        source,
        title,
        description,
        image,
        date,
        url,
        id,
        keyword
      )
    );
  };

  _render = (array) => {
    for (let element of array) {
      this._addArticle({
        source: element.source.name,
        title: element.title,
        description: element.description,
        image: element.urlToImage,
        date: element.publishedAt,
        url: element.url,
        id: element._id,
      });
    }
  };

  renderNews = (array) => {
    for (let element of array) {
      this._addArticle({
        source: element.source,
        title: element.title,
        description: element.text,
        image: element.image,
        date: element.date,
        url: element.link,
        id: element._id,
        keyword: element.keyword,
      });
    }
  };

  renderApi = async (query, toDate, fromDate, pageSize) => {
    try {
      const news = await this.api.getNews(query, toDate, fromDate, pageSize);
      if (news.totalResults === 0) {
        return false;
			}
			this.news = news;
      this.button.removeAttribute('style');
      let SplicedNews = news.articles.splice(0, 3);
      this._render(SplicedNews);
      this.button.addEventListener(
        'click',
        this._buttonShowMore
      );
    } catch (err) {
      console.log(err);
    }
  };

  _showMore = (spliced, found) => {
    if (found.length === 0) {
      this.button.setAttribute('style', 'display: none');
    } else {
      spliced = found.splice(0, 3);
      this._render(spliced);
    }
	};

	_buttonShowMore = () => {
		this._showMore(this.news.articles.splice(0, 3), this.news.articles);
	}

  addListeners = () => {
    this.container.addEventListener('click', this.article.addToFavorites);
    this.container.addEventListener('click', this.article.deleteArticle);
  };
}
