import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKeys from '../../../../../../hooks/use-keys';
import Select from '../../../../../base/form/select';
import SessionTimeOptions from './session-time-options';

const EditSessionTimeDesktop = ({ handleClicks }) => {
  const [handleEdit, handleCancel] = handleClicks;

  const keys = () => [
    { key: 'Enter', fn: handleEdit },
    { key: 'Escape', fn: handleCancel },
  ];

  useKeys(keys);

  return (
    <>
      <Select
        className="timetable-card__select select ml-1 mb-1"
        name="edit.sessionTime"
        id="sessionTime"
        as="select"
      >
        <SessionTimeOptions />
      </Select>
      <span className="timetable-card__value ml-1 mb-1">мин</span>
      <div
        onClick={handleEdit}
        className="timetable-card__btn-edit--primary btn-icon btn-icon--success"
      >
        <FontAwesomeIcon icon="check" />
      </div>
      <div onClick={handleCancel} className="timetable-card__btn-edit btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

export default EditSessionTimeDesktop;
