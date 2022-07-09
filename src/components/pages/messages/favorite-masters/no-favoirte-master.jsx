import { useRouter } from 'next/router';
import React from 'react';
import ChevronRight from '../../../base/icons/chevron-right';

const NoFavoriteMasters = () => {
  const router = useRouter();
  const goToSearch = () => router.push('/search');

  return (
    <p className="messages__no-favorite-masters">
      Добавьте мастера в избранные, и он
      <br /> отобразится здесь! <br />
      <span onClick={goToSearch} className="btn-text btn-text--visit mt-5">
        Найти мастера <ChevronRight />
      </span>
    </p>
  );
};

export default NoFavoriteMasters;
