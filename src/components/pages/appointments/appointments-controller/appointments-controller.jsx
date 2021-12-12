import getClassName from './get-class-name';

const AppointmentsController = ({ userState }) => {
  const [user, setState] = userState;

  const switchToMaster = () => setState((state) => ({ ...state, user: 'master' }));
  const switchToCustomer = () => setState((state) => ({ ...state, user: 'customer' }));

  const masterAppointmentsClassName = getClassName(user, 'master');
  const customerAppointmentsClassName = getClassName(user, 'customer');

  return (
    <h1 className="appointments__controller appointment-controller card mt-8">
      <span onClick={switchToMaster} className={masterAppointmentsClassName}>
        Записи к Вам
      </span>
      <span>|</span>
      <span onClick={switchToCustomer} className={customerAppointmentsClassName}>
        Ваши Записи
      </span>
    </h1>
  );
};

export default AppointmentsController;
