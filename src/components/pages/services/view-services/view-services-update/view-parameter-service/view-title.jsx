import React from 'react';
import Title from '../../../parameter-service/title';

const ViewTitle = ({ title, shownState }) => {
  const [isShown, setIsShown] = shownState;

  const classNameService = `service service-parameter${isShown ? '--expand' : ''} ${!isShown ? 'service--hover' : ''}`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      <Title shownState={shownState} title={title} />
    </div>
  );
};

export default ViewTitle;
