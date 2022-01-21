const getWordReview = (reviewsCount) => {
  if (reviewsCount === 1) return 'отзыв';
  if (reviewsCount < 5) return 'отзыва';
  return 'oтзывов';
};

export default getWordReview;
