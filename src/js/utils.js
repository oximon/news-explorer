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

export { dateChanger, dateFormat };
