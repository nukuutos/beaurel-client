import React from 'react';
import { useSelector } from 'react-redux';
import About from './about/about';
import Biography from './biography';
import Identity from './identity';

const OwnHeader = () => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <>
      <header className="profile__header">
        <Identity />
        <Biography>
          <About />
        </Biography>
        {isPhone && <About />}
      </header>
      <div className="profile__horizontal-line" />
    </>
  );
};

export default OwnHeader;
