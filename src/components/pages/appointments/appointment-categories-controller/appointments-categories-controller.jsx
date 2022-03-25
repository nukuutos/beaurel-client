import { useSelector } from 'react-redux';
import getClassNames from './get-class-names';
import getToCategories from './get-to-categories';

const AppointmentsCategoriesController = ({ categoryState }) => {
  const { isNotification } = useSelector((state) => state.appointments);
  const [{ user, category }, setState] = categoryState;

  const { onConfirmationClassName, confirmedClassName, unsuitableClassName, historyClassName } =
    getClassNames(category, isNotification[user]);

  const { goToOnConfirmation, goToConfirmed, goToUnsuitable, goToHistory } =
    getToCategories(setState);

  return (
    <h2 className="appointments__appointment-types appointment-types card">
      <span onClick={goToOnConfirmation} className={onConfirmationClassName}>
        ожидают
      </span>
      <span onClick={goToConfirmed} className={confirmedClassName}>
        подтверждены
      </span>
      <span onClick={goToUnsuitable} className={unsuitableClassName}>
        неподходящие
      </span>
      <span onClick={goToHistory} className={historyClassName}>
        история
      </span>
    </h2>
  );
};

export default AppointmentsCategoriesController;
