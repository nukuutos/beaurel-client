import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

const NoFavoriteMasters = () => {
  const router = useRouter();
  const goToSearch = () => router.push('/search');

  return (
    <p className="messages__no-favorite-masters">
      Добавьте мастера в избранные, и он
      <br /> отобразится здесь! <br />
      <span onClick={goToSearch} className="btn-text btn-text--visit mt-5">
        Найти мастера <FontAwesomeIcon icon="chevron-right" />
      </span>
    </p>
  );
};

export default NoFavoriteMasters;
