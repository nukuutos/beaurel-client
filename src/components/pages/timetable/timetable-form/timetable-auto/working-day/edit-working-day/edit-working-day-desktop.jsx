import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../../../../../base/form/select';
import DurationOptions from '../../../../utils/duration-options';
import useWorkingDayKeys from '../use-working-day-keys';

const EditWorkingDayDesktop = ({ handleClicks }) => {
  const [handleEdit, handleCancel] = handleClicks;

  useWorkingDayKeys(handleClicks);

  return (
    <>
      <span className="timetable-card__value ml-1 mt-5 ">
        <Select
          className="timetable-card__select select mr-1"
          name="edit.auto.workingDay.startAt"
          as="select"
        >
          <DurationOptions duration={60} />
        </Select>
        -
        <Select
          className="timetable-card__select select ml-1"
          name="edit.auto.workingDay.endAt"
          as="select"
        >
          <DurationOptions duration={60} />
        </Select>
      </span>
      <div
        onClick={handleEdit}
        className="timetable-card__btn-edit--primary btn-icon btn-icon--success timetable-card__btn-edit--bottom"
      >
        <FontAwesomeIcon icon="check" />
      </div>
      <div
        onClick={handleCancel}
        className="timetable-card__btn-edit btn-icon btn-icon--fail timetable-card__btn-edit--bottom"
      >
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

export default EditWorkingDayDesktop;
