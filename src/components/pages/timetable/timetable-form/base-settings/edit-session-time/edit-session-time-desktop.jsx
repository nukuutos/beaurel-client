import useKeys from '../../../../../../hooks/use-keys';
import Select from '../../../../../base/form/select';
import Check from '../../../../../base/icons/check';
import Cross from '../../../../../base/icons/cross';
import SessionTimeOptions from '../../../shared/session-time-options';

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
        <Check />
      </div>
      <div onClick={handleCancel} className="timetable-card__btn-edit btn-icon btn-icon--fail">
        <Cross />
      </div>
    </>
  );
};

export default EditSessionTimeDesktop;
