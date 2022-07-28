import Image from 'next/image';
import React from 'react';
import LandingChevron from '../../../base/icons/landing-chevron';
import useGoTo from '../use-go-to';
import Navigation from './navigation';
import NavigationPhone from './navigation-phone';

const IntroSection = ({ toggleScroll }) => {
  const { goToSignUp, goToSearch } = useGoTo();

  const scrollToFeatures = () =>
    document.querySelector('.feature-section').scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="landing__section landing__section--intro">
      <header className="landing__header">
        <h4 className="landing__logo">Beuarel</h4>
        <Navigation />
        <NavigationPhone toggleScroll={toggleScroll} />
      </header>
      <div className="landing__introduction">
        <div className="landing__group">
          <h3 className="landing__find-yourself">Найди себя</h3>
          <h1 className="landing__primary-heading">Beaurel</h1>
          <h2 className="landing__people-types">Люди делятся на два типа</h2>
          <div className="landing__buttons">
            <button
              onClick={goToSignUp}
              type="button"
              className="btn btn--primary landing__btn landing__btn--become-master"
            >
              Стать мастером
            </button>
            <button onClick={goToSearch} type="button" className="btn btn--secondary landing__btn">
              Найти мастера
            </button>
          </div>
        </div>
        <div className="landing__svg-scene">
          <Image priority layout="fill" src="/svg/work-process.svg" alt="Work process" />
        </div>
      </div>

      <button onClick={scrollToFeatures} type="button" className="landing__go-to-features-btn">
        <LandingChevron />
      </button>
    </section>
  );
};

export default IntroSection;
