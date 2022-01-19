const getWordReview = (reviewsCount) => {
  switch (reviewsCount) {
    case reviewsCount === 1:
      return 'отзыв';
    case reviewsCount < 5:
      return 'отзыва';
    default:
      return 'oтзывов';
  }
};

export default getWordReview;
