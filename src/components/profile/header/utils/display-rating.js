import React from 'react';

const DisplayRating = (ratingScore) => (Number.isInteger(ratingScore) ? ratingScore + '.0' : ratingScore);

export default DisplayRating;
