import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '../../../../../base/form/select';
import Modal from '../../../../../base/modal';
import PossibleServiceDurations from '../possible-service-durations';
import SessionTimeOptions from './session-time-options';

const EditSessionTimePhone = ({ handleClicks, values }) => {
  const [handleEdit, handleCancel] = handleClicks;

  return (
    <Modal isMobileBackground>
      <nav className="modal__back-bar card card--layout">
        <div className="back-bar__main">
          <FontAwesomeIcon
            onClick={handleCancel}
            className="back-bar__icon mr-6"
            icon="arrow-left"
          />
          Длительность сеанса
        </div>
      </nav>
      <div className="timetable-phone-edit-modal">
        <div className="timetable-phone-edit-modal__group timetable-phone-edit-modal__group--session-time mt-8">
          <label htmlFor="sessionTime" className="timetable-phone-edit-modal__label">
            Базовая длительность сеанса:
          </label>
          <Select
            className="timetable-card__select select ml-1 mb-1"
            name="edit.sessionTime"
            id="sessionTime"
            as="select"
          >
            <SessionTimeOptions />
          </Select>
          <span className="timetable-card__value ml-1">мин</span>
        </div>
        <PossibleServiceDurations values={values} className="mt-6" />
        <button
          type="button"
          onClick={handleEdit}
          className="timetable-phone-edit-modal__button btn btn--primary mt-8"
        >
          Изменить
        </button>
      </div>
    </Modal>
  );
};

export default EditSessionTimePhone;
