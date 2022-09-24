import React from 'react';
import Select from '../../../../../../../../../../../base/form/select';
import Time from '../../../../../../../../../../../base/icons/time.';
import DurationOptions from '../../../../../../../../../../services/duration-options/duration-options';
import useDuration from './use-duration';

const Duration = ({ values, service }) => {
  const { durationClassName, initialDuration, isUpdateSessionTime } = useDuration(service, values);

  return (
    <div className="add-service__duration mr-4">
      <label className="label" htmlFor="duration">
        Длительность
      </label>
      <div className={`${durationClassName} input--icon`}>
        <Time className="input__icon input__icon--m" />
        <Select value={values.duration} className="input" name="duration" as="select">
          <option className="input__hide">{initialDuration}</option>
          <DurationOptions isUpdate={isUpdateSessionTime} />
        </Select>
      </div>
    </div>
  );
};

export default Duration;
