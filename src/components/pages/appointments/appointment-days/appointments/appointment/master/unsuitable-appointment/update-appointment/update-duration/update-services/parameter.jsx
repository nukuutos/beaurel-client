import React from 'react';
import Input from '../../../../../../../../../../base/form/input';

const Parameter = () => (
  <div className="add-service__parameter-and-btn">
    <div className="add-service__title add-service__parameter add-service__title--disabled mt-4">
      <label className="label " htmlFor="title">
        Параметр
      </label>
      <Input disabled className="input" type="text" name="parameter" id="parameter" />
    </div>
  </div>
);

export default Parameter;
