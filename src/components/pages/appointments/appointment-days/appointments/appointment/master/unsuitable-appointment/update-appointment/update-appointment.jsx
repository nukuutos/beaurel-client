import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../../../../../../base/modal/modal';
import UpdateDuration from './update-duration/update-duration';
import UpdateResult from './update-result/update-result';
import UpdateSuccess from './update-success';
import UpdateDate from './update-date/update-date';
import { getProfile } from '../../../../../../../../../redux/slices/profile';
import useUpdateAppointmentState from './use-update-appointment-state';

const UpdateAppointment = ({ onClickClose, appointment }) => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, actions] = useUpdateAppointmentState(onClickClose);

  const { step } = state;
  const { close, setService } = actions;

  const { title, duration, price, parameter } = appointment.service;

  useEffect(() => {
    dispatch(getProfile({ profile: { id } })); // for getting booked appointments. be careful with profile page
    setService({ title, duration, price, parameter });
  }, [dispatch, title, duration, price, parameter, id, setService]);

  return (
    <Modal onClickClose={close}>
      {step === 1 && <UpdateDuration state={state} {...actions} />}
      {step === 2 && <UpdateDate appointment={appointment} state={state} {...actions} />}
      {step === 3 && <UpdateResult appointment={appointment} state={state} {...actions} />}
      {step === 4 && <UpdateSuccess onClickClose={close} />}
    </Modal>
  );
};

export default UpdateAppointment;
