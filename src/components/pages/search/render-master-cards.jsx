import React from 'react';
import MasterCard from '../../base/master-card/master-card';

const renderMasterCards = ({ data, refToLoadData }) =>
  data.map((master, i) => {
    const isPreLastCard = i === data.length - 2;

    return isPreLastCard ? (
      <MasterCard
        masterCardRef={refToLoadData}
        className="search__master-card"
        master={master}
        key={master._id}
      />
    ) : (
      <MasterCard className="search__master-card" master={master} key={master._id} />
    );
  });

export default renderMasterCards;
