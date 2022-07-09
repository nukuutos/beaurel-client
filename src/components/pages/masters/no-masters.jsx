import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import ChevronRight from '../../base/icons/chevron-right';

const NoMasters = () => {
  const router = useRouter();
  const goToTimetable = () => router.push('/search');

  return (
    <div className="masters__no-masters no-master-tools">
      <div className="masters__no-masters-image">
        <Image priority layout="fill" alt="No favorite masters" src="/svg/no-favorites.svg" />
      </div>

      <p className="no-master-tools__text no-master-tools__text--center mt-9">
        Добавьте мастера в избранные, и он
        <br /> отобразится здесь! <br />
        <span onClick={goToTimetable} className="btn-text btn-text--visit mt-5">
          Найти мастера <ChevronRight />
        </span>
      </p>
    </div>
  );
};

export default NoMasters;
