import React from 'react';
import Title from '../../parameter-service/title';

const UpdateTitle = ({ title, shownState, subServices }) => {
  const [isShown, setIsShown] = shownState;
  const sessionTime = 240;

  const isCorrectDuration = subServices.every((subService) => subService.duration % sessionTime === 0);
  const classNameService = `service service-parameter${isShown ? '--expand' : ''} service-parameter-update__title ${
    !isShown ? 'service-parameter-update__title--rolled-up' : ''
  } service-parameter-update__sub-service service-parameter-update__sub-service--${
    isCorrectDuration ? 'success' : 'fail'
  }`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      <Title shownState={shownState} title={title} />
    </div>
  );
};

export default UpdateTitle;
