
module.exports = (data) => {
  return data.sort((prev, next) => {
    return new Date(prev.date) - new Date(next.date);
  });
};
