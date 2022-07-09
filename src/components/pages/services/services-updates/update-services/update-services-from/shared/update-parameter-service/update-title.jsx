import React from 'react';
import ParameterServiceTitle from '../../../../../base/parameter-service/parameter-service-title';

const UpdateTitle = ({ title, shownState }) => {
  const [isShown, setIsShown] = shownState;

  const serviceParameterClassName = `service-parameter${isShown ? '--expand' : ''}`;
  const titleClassName = !isShown ? 'service-parameter-update__title--rolled-up' : '';

  const serviceClassName = `service ${serviceParameterClassName} service-parameter-update__title ${titleClassName} service-parameter-update__sub-service`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={serviceClassName}>
      <ParameterServiceTitle shownState={shownState} title={title} />
    </div>
  );
};

export default UpdateTitle;
