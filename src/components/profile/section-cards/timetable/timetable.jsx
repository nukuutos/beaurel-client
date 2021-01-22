import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableAndAppointmentsStart } from '../../../../redux/timetable/actions';
import { useDispatch } from 'react-redux';
import { getPreviousWeek, getNextWeek } from './utils/get-week';
import useWeek from './hooks/useWeek';

const Timetable = ({ stepState }) => {
  const [{ step }, setStep] = stepState;
  const [weekDays, setDate] = useWeek(setStep);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimetableAndAppointmentsStart());
  }, []);

  return (
    <main className="timetable">
      <div className="week">
        <div className="week__header">
          {step === 2 && (
            <div className="service__icon service__icon--manage service__icon--back">
              <FontAwesomeIcon
                onClick={() =>
                  setStep((state) => {
                    return { ...state, isService: true, isTimetable: false, step: state.step - 1 };
                  })
                }
                icon="long-arrow-alt-left"
              />
            </div>
          )}
          <div
            onClick={() => setDate((today) => getPreviousWeek(today))}
            className={`service__icon service__icon--manage`}>
            <FontAwesomeIcon icon="chevron-left" />
          </div>
          <h3>Расписание</h3>
          <div onClick={() => setDate((today) => getNextWeek(today))} className={`service__icon service__icon--manage`}>
            <FontAwesomeIcon icon="chevron-right" />
          </div>
          <span className="week__fraction mr-s-4">1/3</span>
        </div>
        {weekDays}
      </div>
    </main>
  );
};

export default Timetable;
