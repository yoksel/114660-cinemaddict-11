export const sortByRating = (a, b) => {
  return b.rating - a.rating;
};

export const sortByDate = (a, b) => {
  return b.releaseDate - a.releaseDate;
};

export const sortByComments = (a, b) => {
  return b.comments.length - a.comments.length;
};
