import React from 'react';
import { featuresDataCustomer, featuresDataMaster } from './features-data';
import FeatureBox from './feature-box';
import useSlider from './use-slider';
import useElementAppearence from './use-element-appearence';

const FeatureSection = () => {
  const switchRef = useElementAppearence({ className: 'feature-switch--visible', threshold: 1 });
  const titleRef = useElementAppearence({
    className: 'feature-section__title--visible',
    threshold: 1,
  });

  const { classNames, handleClicks, styles, handlers } = useSlider();
  const { customerOptionClassName, masterOptionClassName } = classNames;
  const { customerOptionOnClick, masterOptionOnClick } = handleClicks;

  return (
    <section className="landing__section feature-section">
      <header className="feature-section__header">
        <h2 ref={titleRef} className="feature-section__title">
          Наше предложение
        </h2>
        <div ref={switchRef} className="feature-switch">
          <ul className="feature-switch__options">
            <li onClick={masterOptionOnClick} className={masterOptionClassName}>
              мастеру
            </li>
            <li onClick={customerOptionOnClick} className={customerOptionClassName}>
              клиенту
            </li>
          </ul>
        </div>
      </header>
      <div {...handlers} style={styles} className="feature-section__carousel">
        <div className="feature-section__features">
          {featuresDataMaster.map((data) => (
            <FeatureBox {...data} key={data.title} />
          ))}
        </div>
        <div className="feature-section__features">
          {featuresDataCustomer.map((data) => (
            <FeatureBox {...data} isAnimationOnAppearence={false} key={data.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
