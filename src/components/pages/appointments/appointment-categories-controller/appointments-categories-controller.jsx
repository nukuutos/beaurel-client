import { useSelector } from 'react-redux';
import getClassNames from './get-class-names';

const AppointmentsCategoriesController = ({
  state,
  setOnConfirmation,
  setConfirmed,
  setUnsuitable,
  setHistory,
}) => {
  const { isNotification } = useSelector((state) => state.appointments);
  const { user, category } = state;

  const { onConfirmationClassName, confirmedClassName, unsuitableClassName, historyClassName } =
    getClassNames(category, isNotification[user]);

  return (
    <h2 className="appointments__appointment-types appointment-types card">
      <span onClick={setOnConfirmation} className={onConfirmationClassName}>
        ожидают
      </span>
      <span onClick={setConfirmed} className={confirmedClassName}>
        подтверждены
      </span>
      <span onClick={setUnsuitable} className={unsuitableClassName}>
        неподходящие
      </span>
      <span onClick={setHistory} className={historyClassName}>
        история
      </span>
    </h2>
  );
};

export default AppointmentsCategoriesController;
