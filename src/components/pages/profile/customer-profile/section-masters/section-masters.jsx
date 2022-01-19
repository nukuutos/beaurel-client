import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import FavoriteMasterCard from './favorite-master-card';

const SectionMasters = () => {
  const favoriteMasters = useSelector((state) => state.favorites);

  return (
    <>
      <div className="profile__horizontal-line" />
      {!favoriteMasters.length ? (
        <div className="profile__masters-section masters-section">
          <h3 className="masters-section__heading">Мастера</h3>

          <div className="masters-section__favorite-masters">
            {favoriteMasters.map((master) => (
              <FavoriteMasterCard {...master} />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-masters card">
          <p className="no-masters__text">
            Добавьте вашего первого мастера
            <br />и он отобразится
            <br />
            здесь!
          </p>
          <div className="no-masters__hearts">
            <FontAwesomeIcon icon="heart" />
            <FontAwesomeIcon icon="heart" />
            <FontAwesomeIcon icon="heart" />
          </div>
        </div>
      )}
    </>
  );
};

export default SectionMasters;
