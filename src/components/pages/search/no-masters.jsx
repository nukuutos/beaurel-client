import Image from 'next/image';
import React from 'react';

const NoMasters = () => (
  <div className="search__no-masters">
    <Image
      priority
      layout="fill"
      className="search__no-masters"
      alt="No masters"
      src="/svg/no-search-masters.svg"
    />
  </div>
);

export default NoMasters;
