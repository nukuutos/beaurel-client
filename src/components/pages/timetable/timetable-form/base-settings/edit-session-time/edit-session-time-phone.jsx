import Select from '../../../../../base/form/select';
import ArrowLeft from '../../../../../base/icons/arrow-left';
import Modal from '../../../../../base/modal/modal';
import PossibleServiceDurations from '../../../shared/possible-service-durations';
import SessionTimeOptions from '../../../shared/session-time-options';

const EditSessionTimePhone = ({ handleClicks, values }) => {
  const [handleEdit, handleCancel] = handleClicks;

  return (
    <Modal>
      <nav className="modal__back-bar card card--layout">
        <div className="back-bar__main">
          <ArrowLeft onClick={handleCancel} className="back-bar__icon mr-6" />
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
        <PossibleServiceDurations values={values.edit} className="mt-6" />
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
