import React from 'react';
import JustTry from '../../base/icons/just-try';
import useElementAppearence from './feature-section/use-element-appearence';
import useGoTo from './use-go-to';

const ActionSection = () => {
  const { goToSearch } = useGoTo();

  const svgWrapperRef = useElementAppearence({
    className: 'section-action__svg-wrapper--visible',
    threshold: 1,
  });

  const justTryRef = useElementAppearence({
    className: 'section-action__just-try--visible',
    threshold: 1,
  });

  const buttonRef = useElementAppearence({
    className: 'section-action__btn--visible',
    threshold: 1,
  });

  return (
    <div className="landing__section section-action">
      <div ref={svgWrapperRef} className="section-action__svg-wrapper">
        <JustTry className="section-action__svg" />
      </div>
      <span ref={justTryRef} className="section-action__just-try">
        Just try.
      </span>
      <button
        ref={buttonRef}
        onClick={goToSearch}
        type="button"
        className="btn btn--secondary section-action__btn"
      >
        Просто попробуйте
      </button>
    </div>
  );
};

export default ActionSection;
