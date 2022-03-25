const getInitialValues = (review) => {
  if (!review) return { value: 0, comment: '' };
  const { value, comment } = review;
  return { value, comment };
};

export default getInitialValues;
