import Select from '../../../../base/form/select';
import DurationOptions from '../../utils/duration-options';

const WorkingDay = ({ goToNextStep, handleChange, validateField, errors }) => {
  const { endAt: endAtError } = errors.auto?.workingDay || {};

  const disabledClassName = endAtError ? 'btn--disabled' : '';

  const validate = (event) => {
    handleChange(event);
    validateField('auto.workingDay.startAt');
    validateField('auto.workingDay.endAt');
  };

  return (
    <div className="sign-up__group">
      <h2 className="sign-up__heading">Укажите Ваш рабочий день</h2>

      <div className="create-timetable__working-day mt-5 ">
        <Select
          onChange={validate}
          className="select mr-1"
          name="auto.workingDay.startAt"
          as="select"
        >
          <DurationOptions duration={60} startAt={480} />
        </Select>
        <span>до</span>
        <Select
          onChange={validate}
          className="select ml-1"
          name="auto.workingDay.endAt"
          as="select"
        >
          <DurationOptions duration={60} startAt={480} />
        </Select>
      </div>

      {endAtError ? <div className="error mt-1">{endAtError}</div> : null}

      <button
        onClick={endAtError ? null : goToNextStep}
        type="button"
        className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
      >
        Продолжить
      </button>
    </div>
  );
};

export default WorkingDay;
