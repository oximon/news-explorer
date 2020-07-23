import 'babel-polyfill';

export default class ArticleList {
  constructor(container, article, api) {
    this.container = container;
    this.article = article;
    this.api = api;
  }

  addArticle = ({ source, title, description, image, date, url }) => {
    return this.container.appendChild(
      this.article.createArticle(source, title, description, image, date, url)
    );
  };

  render = (array) => {
    for (let element of array) {
      this.addArticle({
        source: element.source.name,
        title: element.title,
        description: element.description,
        image: element.urlToImage,
        date: element.publishedAt,
        url: element.url,
      });
    }
  };

  renderApi = async (query, toDate, fromDate, pageSize) => {
    try {
      const news = await this.api.getNews(query, toDate, fromDate, pageSize);
      if (news.totalResults === 0) {
        return false
      }
      this.render(news.articles);
    } catch (err) {
      console.log(err);
    }
  };

  addListeners = () => {};
}
