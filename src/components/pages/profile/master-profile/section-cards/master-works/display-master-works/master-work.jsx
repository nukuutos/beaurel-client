import React from 'react';

const MasterWork = ({ goToCarousel, work }) => {
  const { _id, title } = work;

  return (
    <figure onClick={goToCarousel} className="master-work">
      <img
        src={`http://localhost:5000/images/works/${_id}.png`}
        alt="Master's work"
        className="master-work__img"
      />
      <figcaption className="master-work__title">{title}</figcaption>
    </figure>
  );
};

export default MasterWork;
