import React from 'react';
import useElementAppearence from './use-element-appearence';

const FeatureBox = ({ icon, title, description, isAnimationOnAppearence = true }) => {
  const featureBoxRef = useElementAppearence({ className: 'feature-box--visible', threshold: 0.4 });
  const animationClassName = isAnimationOnAppearence ? '' : 'feature-box--visible';
  const soonClassName = !description ? 'feature-box--soon' : '';
  const titleClassName = !description ? 'feature-box__title--soon' : '';

  return (
    <div
      ref={isAnimationOnAppearence ? featureBoxRef : null}
      className={`feature-box ${animationClassName} ${soonClassName}`}
    >
      <header className="feature-box__header">
        {icon}
        <h3 className={`feature-box__title ${titleClassName}`}>{title}</h3>
      </header>
      <p className="feature-box__description">{description}</p>
    </div>
  );
};

export default FeatureBox;
