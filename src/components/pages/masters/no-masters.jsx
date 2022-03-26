import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

const NoMasters = () => {
  const router = useRouter();
  const goToTimetable = () => router.push('/search');

  return (
    <div className="masters__no-masters no-master-tools">
      <img className="no-master-tools__svg" alt="No favorite masters" src="/svg/no-favorites.svg" />

      <p className="no-master-tools__text no-master-tools__text--center mt-9">
        Добавьте мастера в избранные, и он
        <br /> отобразится здесь! <br />
        <span onClick={goToTimetable} className="btn-text btn-text--visit mt-5">
          Найти мастера <FontAwesomeIcon icon="chevron-right" />
        </span>
      </p>
    </div>
  );
};

export default NoMasters;
