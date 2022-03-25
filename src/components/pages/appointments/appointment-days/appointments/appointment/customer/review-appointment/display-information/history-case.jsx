import React from 'react';

const HistoryCase = ({ review, openReviewEditor }) =>
  review ? (
    <div onClick={openReviewEditor} className="btn btn--flat btn--secondary">
      Изменить отзыв
    </div>
  ) : (
    <div onClick={openReviewEditor} className="btn btn--flat btn--primary">
      Оставить отзыв
    </div>
  );

export default HistoryCase;
