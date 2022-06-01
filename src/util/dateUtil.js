export const convertDateToObj = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    year,
    month,
    day,
  };
};

export const fillNumberToTens = (value) =>
  `${value}`.length === 1 ? `0${value}` : value;

export const isValidDate = (year, month, day) => {
  const date = new Date(`${year}-${month}-${day}`);
  return (
    date instanceof Date &&
    !isNaN(date) &&
    date.getFullYear() === +year &&
    date.getMonth() + 1 === +month &&
    date.getDate() === +day
  );
};
