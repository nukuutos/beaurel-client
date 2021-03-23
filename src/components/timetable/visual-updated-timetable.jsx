import React, { useState } from 'react';
import convertDateToString from '../profile/section-cards/timetable/utils/convert-date-to-string';
import VisualUpdatedTimetableAuto from './visual-updated-timetable-auto';
import VisualUpdatedTimetableManually from './visual-updated-timetable-manually';
import Modal from '../utils/modal';
import useAsyncAction from '../../hooks/useAsyncAction';
import { unsetTimetableUpdate } from '../../redux/timetable/actions';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../redux/alert/actions';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const VisualUpdatedTimetable = ({ update }) => {
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [{ accessToken, id: profileId }, { _id: timetableId }] = useSelector((state) => [state.auth, state.timetable]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const { date } = update;

  const deleteTimetableUpdate = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/timetable/${timetableId}/update`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(unsetTimetableUpdate());
      dispatch(setAlert(alert));
    }
  };

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">
        Расписание c {convertDateToString(new Date(date))}{' '}
        <div onClick={() => setIsConfirmation(true)} className={`btn btn--secondary btn--flat btn--fail `}>
          Отменить
        </div>
      </div>
      <div className="timetable-visual mt-4">
        {update.type === 'auto' ? (
          <VisualUpdatedTimetableAuto update={update} />
        ) : (
          <VisualUpdatedTimetableManually update={update} />
        )}
      </div>
      {isConfirmation && (
        <Modal onClickClose={() => setIsConfirmation(false)}>
          <div className="update-cancellation card">
            <div className="update-cancellation__heading heading-primary">Предупреждение</div>
            <p className="update-cancellation__text mt-8">Вы действительно хотите отменить обновление?</p>

            <div className="update-cancellation__buttons mt-8">
              <div
                onClick={() => deleteTimetableUpdate()}
                className={`btn btn--fail-solid ${isLoading ? 'btn--disabled btn--spinner' : ''} mr-4`}>
                Отменить
              </div>
              <div
                onClick={() => setIsConfirmation(false)}
                className={`btn ${isLoading ? 'btn--disabled' : ''} btn--secondary btn--gray`}>
                Не отменить
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default VisualUpdatedTimetable;
