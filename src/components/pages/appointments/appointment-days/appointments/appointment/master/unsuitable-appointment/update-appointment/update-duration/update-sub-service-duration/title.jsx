import React from 'react';
import Input from '../../../../../../../../../../base/form/input';

const Title = () => (
  <div className="add-service__title add-service__title--disabled">
    <label className="label " htmlFor="title">
      Название
    </label>
    <Input disabled className="input" type="text" name="title" id="title" />
  </div>
);

export default Title;
