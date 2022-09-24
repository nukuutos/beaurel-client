import Modal from '../../../../../base/modal/modal';
import ModalHeading from '../../../../../base/modal/modal-heading';
import getWeekdayData from '../../../utils/get-weekday-data';
import weekdaysRU from '../../../utils/weekdays-ru';

const EditModal = ({ values, handleClicks, ...fieldArrayProps }) => {
  const [handleEdit, handleCancel] = handleClicks;
  const { weekends } = values.edit.auto;

  return (
    <Modal onClickClose={handleCancel}>
      <div className="weekends weekends--mobile">
        <ModalHeading
          titleDesktopClassName="weekends__heading"
          onClickClose={handleCancel}
          title="Выходные"
        />

        <p className="weekends__text">Выбери свои выходные!</p>

        <div className="weekends__days">
          {weekdaysRU.map((weekdayName, weekdayIndex) => {
            const { onClick, className } = getWeekdayData({
              weekends,
              weekdayIndex,
              ...fieldArrayProps,
            });

            const weekdayToDisplay = weekdayName.toUpperCase();

            return (
              <div
                name={`edit.auto.weekends.${weekdayIndex}`}
                className={`weekends__day mt-6 ${className}`}
                onClick={onClick}
                key={weekdayName}
              >
                {weekdayToDisplay}
              </div>
            );
          })}
        </div>

        <div onClick={handleEdit} className="weekends__button btn btn--primary mt-6">
          Изменить
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
