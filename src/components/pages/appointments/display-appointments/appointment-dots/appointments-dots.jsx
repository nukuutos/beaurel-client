import { useSelector } from 'react-redux';
import useDots from './use-dots/use-dots';

const AppointmentsDots = ({ user, category, active, direction }) => {
  const { appointments: appointmentsState } = useSelector((state) => state.appointments);
  const { appointments } = appointmentsState[user][category];

  const days = Object.keys(appointments);
  const daysNumber = days.length;

  const [dots, dotsOffsetStyles, dotsWidthStyles] = useDots({ active, daysNumber, direction });

  return (
    <>
      <div className="card appointments__date mt-8">
        <span>Дата</span>
        <span>{days[active]}</span>
      </div>
      {daysNumber > 1 && (
        <div className="card appointments__dots mt-8">
          <div style={dotsWidthStyles} className="appointments__date-dots">
            <div style={dotsOffsetStyles} className="appointments__date-dot-window">
              {dots}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentsDots;
