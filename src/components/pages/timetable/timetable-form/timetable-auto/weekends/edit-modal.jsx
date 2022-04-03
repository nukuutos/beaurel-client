import React from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import ModalHeading from '../../../../../base/modal/modal-heading';
import weekdaysRU from '../../../utils/weekdays-ru';
import getWeekdayData from './get-weekday-data';

const EditModal = ({ values, handleClicks, ...fieldArrayProps }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [handleEdit, handleCancel] = handleClicks;

  return (
    <Modal onClickClose={handleCancel}>
      <div className={`weekends weekends--mobile ${isPhone ? '' : 'card'}`}>
        <ModalHeading
          titleDesktopClassName="weekends__heading"
          onClickClose={handleCancel}
          title="Выходные"
        />

        <p className="weekends__text">Выбери свои выходные!</p>

        <div className="weekends__days">
          {weekdaysRU.map((weekdayName, weekdayIndex) => {
            const { onClick, className } = getWeekdayData({
              values,
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
