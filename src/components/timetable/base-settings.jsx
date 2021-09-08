import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import filterExceptions from "./utils/filter-exceptions";
import displayPossibleServiceDuration from "./utils/display-possible-service-duration";
import useMediaQuery from "../../hooks/use-media-query";
import Modal from "../utils/modal";
import Select from "../form/select";
import useKeys from "../../hooks/use-keys";

const renderSessionTimeOptions = () => {
  const options = [];

  for (let i = 30; i <= 120; i += 30) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  return options;
};

const MobileEditSessionTime = ({ onClickEdit, onClickCancel, sessionTime, editingSessionTime }) => (
  <Modal isMobileBackground>
    <nav className={`modal__back-bar card card--layout`}>
      <div className="back-bar__main">
        <FontAwesomeIcon onClick={onClickCancel} className="back-bar__icon mr-6" icon="arrow-left" />
        Длительность сеанса
      </div>
    </nav>
    <div className="timetable-phone-edit-modal">
      <div className="timetable-phone-edit-modal__group timetable-phone-edit-modal__group--session-time mt-8">
        <label className="timetable-phone-edit-modal__label">Базовая длительность сеанса:</label>
        <Select className="timetable-card__select select ml-1 mb-1" name="edit.sessionTime" as="select">
          {renderSessionTimeOptions()}
        </Select>
        <span className="timetable-card__value ml-1">мин</span>
      </div>
      <span className="timetable-card__tip mt-6">
        Возможная длительность ваших услуг:
        {/* generate */}
        <span className="timetable-card__tip--primary">{displayPossibleServiceDuration(editingSessionTime)}</span>
      </span>
      <button onClick={onClickEdit} className={`timetable-phone-edit-modal__button btn btn--primary mt-8`}>
        Изменить
      </button>
    </div>
  </Modal>
);

const EditSessionTime = ({ onClickEdit, onClickCancel }) => {
  const keys = () => [
    { key: "Enter", fn: onClickEdit },
    { key: "Escape", fn: onClickCancel },
  ];

  useKeys(keys);

  return (
    <>
      <Select className="timetable-card__select select ml-1 mb-1" name="edit.sessionTime" as="select">
        {renderSessionTimeOptions()}
      </Select>
      <span className="timetable-card__value ml-1 mb-1">мин</span>
      <div onClick={onClickEdit} className="timetable-card__btn-edit--primary btn-icon btn-icon--success">
        <FontAwesomeIcon icon="check" />
      </div>
      <div onClick={onClickCancel} className="timetable-card__btn-edit btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

const renderEditWindow = (isPhone, onClickEdit, onClickCancel, sessionTime, editingSessionTime) => {
  return isPhone ? (
    <MobileEditSessionTime
      onClickEdit={onClickEdit}
      onClickCancel={onClickCancel}
      sessionTime={sessionTime}
      editingSessionTime={editingSessionTime}
    />
  ) : (
    <EditSessionTime onClickEdit={onClickEdit} onClickCancel={onClickCancel} />
  );
};

const BaseSettings = ({ values, update, initialValues, setFieldValue, editParentState }) => {
  const { auto, edit, sessionTime } = values;
  const { sessionTime: editingSessionTime } = edit;

  const {
    exceptions,
    workingDay: { startAt },
  } = auto;

  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.sessionTime);
  const isPhone = useMediaQuery(600);

  const onClickEdit = () => {
    const filteredExceptions = filterExceptions(exceptions, editingSessionTime, startAt);
    setFieldValue("auto.exceptions", filteredExceptions);
    setFieldValue("sessionTime", editingSessionTime);
    setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
  };

  const onClickCancel = () => {
    setEditState({ isEditing: false, element: { ...editState, sessionTime: false } });
  };

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--edit mt-8 card">
      <div className="timetable-card__heading mb-1">Базовые настройки</div>
      <label className="timetable-card__label">Базовая длительность сеанса:</label>
      {element.sessionTime ? (
        renderEditWindow(isPhone, onClickEdit, onClickCancel, sessionTime, editingSessionTime)
      ) : (
        <>
          <span className="timetable-card__value">{sessionTime} мин</span>
          {!isDisabled && (
            <div
              onClick={() => setEditState({ isEditing: true, element: { ...editState, sessionTime: true } })}
              className="timetable-card__btn-edit timetable-card__btn-edit--absolute btn-icon"
            >
              <FontAwesomeIcon icon="pen" />
            </div>
          )}
        </>
      )}

      <span className="timetable-card__tip mt-1">
        Возможная длительность ваших услуг:
        {/* generate */}
        <span className="timetable-card__tip--primary">{displayPossibleServiceDuration(editingSessionTime)}</span>
      </span>
    </div>
  );
};

export default BaseSettings;
