import React from "react";
import useMediaQuery from "../../hooks/use-media-query";
import decimalFormat from "../profile/utils/decimal-format";
import Stars from "../utils/stars/stars";

const MasterCardRating = ({ className = "", ratingScore = null }) => {
  const isPhone = useMediaQuery(600);

  return ratingScore ? (
    <div className={`master-card__rating ${className}`}>
      <span className="master-card__rating-score mr-1">{decimalFormat(ratingScore)}</span>
      <Stars score={decimalFormat(ratingScore)} starSize={isPhone ? "small-super" : "small"} />
    </div>
  ) : (
    <div className="master-card__rating" />
  );
};

export default MasterCardRating;
