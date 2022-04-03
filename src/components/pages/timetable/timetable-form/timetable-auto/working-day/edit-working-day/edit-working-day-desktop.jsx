import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../../../../../base/form/select';
import DurationOptions from '../../../../utils/duration-options';
import useWorkingDayKeys from '../use-working-day-keys';

const EditWorkingDayDesktop = ({ handleClicks, handleChange, validateField, errors }) => {
  const [handleEdit, handleCancel] = handleClicks;
  const { endAt: endAtError } = errors.edit?.auto.workingDay || {};

  useWorkingDayKeys(handleClicks);

  const validate = (event) => {
    handleChange(event);
    validateField('edit.auto.workingDay.startAt');
    validateField('edit.auto.workingDay.endAt');
  };

  return (
    <>
      <span className="timetable-card__value ml-1 mt-5 ">
        <Select
          onChange={validate}
          className="timetable-card__select select mr-1"
          name="edit.auto.workingDay.startAt"
          as="select"
        >
          <DurationOptions duration={60} startAt={480} />
        </Select>
        -
        <Select
          onChange={validate}
          className="timetable-card__select select ml-1"
          name="edit.auto.workingDay.endAt"
          as="select"
        >
          <DurationOptions duration={60} startAt={480} />
        </Select>
      </span>
      <div
        onClick={endAtError ? null : handleEdit}
        className={`timetable-card__btn-edit--primary btn-icon btn-icon--success ${
          endAtError ? 'btn-icon--disabled' : ''
        } timetable-card__btn-edit--bottom`}
      >
        <FontAwesomeIcon icon="check" />
      </div>
      <div
        onClick={handleCancel}
        className="timetable-card__btn-edit btn-icon btn-icon--fail timetable-card__btn-edit--bottom"
      >
        <FontAwesomeIcon icon="times" />
      </div>

      {endAtError ? <div className="timetable-card__error error mt-1">{endAtError}</div> : null}
    </>
  );
};

export default EditWorkingDayDesktop;
