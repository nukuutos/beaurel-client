import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteMaster from './favorite-master';

const DisplayFavoriteMasters = ({ refToLoadData, closeFavoriteMasters }) => {
  const favorites = useSelector((state) => state.favorites);

  return favorites.map((favorite, i) => {
    const isPreLastCard = i === favorites.length - 2;

    return isPreLastCard ? (
      <FavoriteMaster
        refToLoadData={refToLoadData}
        onClickClose={closeFavoriteMasters}
        master={favorite}
      />
    ) : (
      <FavoriteMaster onClickClose={closeFavoriteMasters} master={favorite} />
    );
  });
};

export default DisplayFavoriteMasters;
