/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
const dateChanger = (toDate, days) => {
  const dateOffset = 24 * 60 * 60 * 1000 * days;

  let dateCorrect = toDate;
  toDate.setTime(toDate.getTime() + dateOffset);
  dateCorrect = dateCorrect.toISOString();

  return dateCorrect;
};

const dateFormat = (importDate) => {
  const date = new Date(importDate);

  const dayMonth = {
    month: 'long',
    day: 'numeric',
  };
  const year = {
    year: 'numeric',
  };

  const resultDate = `${date.toLocaleString(
    'ru',
    dayMonth,
  )}, ${date.toLocaleString('ru', year)}`;

  return resultDate;
};

const _keywordsSort = (keywords) => {
  const obj = {};
  keywords.forEach((el) => {
    obj[el.keyword] !== undefined
      ? (obj[el.keyword] += 1)
      : (obj[el.keyword] = 0);
  });
  const arr = [];
  Object.keys(obj).forEach((element) => {
    const newObj = {};
    newObj[element] = obj[element];
    arr.push(newObj);
  });
  arr.sort((a, b) => Object.values(b)[0] - Object.values(a)[0]);
  const arr2 = arr.map((el) => Object.keys(el).map((key) => key));
  return arr2;
};

const showKeywords = (keywords) => {
  const sortedkeywords = _keywordsSort(keywords);
  if (sortedkeywords.length > 3) {
    document.querySelector('.header__articles-keywords').textContent = `${sortedkeywords.slice(0, 2).join(', ')} и ${sortedkeywords.length - 2} других`;
  }

  if (sortedkeywords.length <= 3) {
    document.querySelector('.header__articles-keywords').textContent = sortedkeywords.slice(0, 3).join(', ');
  }
};

export { dateChanger, dateFormat, showKeywords };
