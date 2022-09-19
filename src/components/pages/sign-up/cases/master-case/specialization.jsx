import React, { useEffect } from 'react';
import specializations from '../../../../../config/specializations';
import Select from '../../../../base/form/select';

const Specialization = ({ values, goToNextStep, errors, validateField }) => {
  const isDisabled = !!errors.specialization;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  useEffect(() => {
    validateField('specialization');
  }, [validateField]);

  return (
    <>
      <h2 className="sign-up__heading">Выберите свою специализацию</h2>

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="password">
            Специализация
          </label>
          <Select
            value={values.specialization}
            className="input select sign-up__input"
            name="specialization"
            as="select"
          >
            <option value="" className="input__hide" />
            {specializations.map((specialization) => (
              <option value={specialization} key={specialization} className="option">
                {specialization}
              </option>
            ))}
          </Select>
        </div>

        <button
          disabled={isDisabled}
          onClick={goToNextStep}
          type="button"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Продолжить
        </button>
      </div>
    </>
  );
};

export default Specialization;
