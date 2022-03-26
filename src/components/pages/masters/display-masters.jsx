import React from 'react';
import { useSelector } from 'react-redux';
import MasterCard from '../../base/master-card/master-card';
import useOnScroll from './use-on-scroll';

const DisplayMasters = () => {
  const favorites = useSelector((state) => state.favorites);
  const [refToLoadData, isLoading] = useOnScroll();

  return favorites.map((master, i) => {
    const isPreLastCard = i === favorites.length - 2;

    return isPreLastCard ? (
      <MasterCard
        masterCardRef={refToLoadData}
        className="masters__master-card"
        master={master}
        key={master._id}
      />
    ) : (
      <MasterCard className="masters__master-card" master={master} key={master._id} />
    );
  });
};

export default DisplayMasters;
