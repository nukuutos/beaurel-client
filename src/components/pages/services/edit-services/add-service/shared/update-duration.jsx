import dayjs from 'dayjs';
import React from 'react';
import Select from '../../../../../base/form/select';
import Time from '../../../../../base/icons/time.';
import DurationOptions from '../../../duration-options/duration-options';

const UpdateDuration = ({ name, value, updateDate }) => {
  const date = dayjs(updateDate).utc(true);

  return (
    <div className="add-service__title mt-4">
      <label className="label " htmlFor={name}>
        Длительность c<span className="add-service__date"> {date.format('DD.MM.YY')}</span>
      </label>
      <div className="input--icon input--mini">
        <Time className="input__icon input__icon--m" />
        <Select value={value} className="input" name={name} as="select">
          <DurationOptions isUpdate />
        </Select>
      </div>
    </div>
  );
};

export default UpdateDuration;
