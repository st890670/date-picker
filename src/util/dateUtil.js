export const convertDateToObj = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const week = date.getDay();
  const day = date.getDate();
  return {
    year,
    month,
    week,
    day,
  };
};

export default convertDateToObj;
