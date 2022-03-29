import React from 'react';
import MasterCard from '../../base/master-card/master-card';

const minMastersToLoad = 10;

const DisplayMasterCards = ({ data, refToLoadData }) => {
  const needLoad = data.length >= minMastersToLoad;

  return data.map((master, i) => {
    const isPreLastCard = i === data.length - 2;
    refToLoadData = needLoad ? refToLoadData : null;

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
};
export default DisplayMasterCards;
