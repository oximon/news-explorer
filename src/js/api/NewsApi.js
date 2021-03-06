import 'babel-polyfill';

export default class NewsApi {
  constructor(config) {
    this.config = config;
  }

  getNews = async (query, toDate, fromDate, pageSize) => {
    try {
      const news = await fetch(
        `https://praktikum.tk/news/v2/everything?q=${query}&to=${toDate}&from=${fromDate}&pageSize=${pageSize}&language=ru&sortBy=publishedAt&apiKey=${this.config.APIkey}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (news.ok) {
        return news.json();
      }

      return Promise.reject(`Ошибка: ${news.status}`);
    } catch (err) {
      console.log(err);
    }
  };
}
