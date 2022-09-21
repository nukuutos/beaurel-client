import { useSelector } from 'react-redux';
import getClassName from './get-class-name';

const AppointmentsController = ({ state, setMaster, setCustomer }) => {
  const { isNotification } = useSelector((state) => state.appointments);
  const { user } = state;

  const masterAppointmentsClassName = getClassName(user, 'master', isNotification);
  const customerAppointmentsClassName = getClassName(user, 'customer', isNotification);

  return (
    <h1 className="appointments__controller appointment-controller card mt-8">
      <span onClick={setMaster} className={masterAppointmentsClassName}>
        Записи к Вам
      </span>
      <span>|</span>
      <span onClick={setCustomer} className={customerAppointmentsClassName}>
        Ваши Записи
      </span>
    </h1>
  );
};

export default AppointmentsController;
