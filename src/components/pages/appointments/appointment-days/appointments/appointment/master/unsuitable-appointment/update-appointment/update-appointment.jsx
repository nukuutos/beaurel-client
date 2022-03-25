import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointmentService } from '../../../../../../../../../redux/appointments/actions';
import Modal from '../../../../../../../../base/modal/modal';
import UpdateDuration from './update-duration/update-duration';
import UpdateResult from './update-result/update-result';
import UpdateSuccess from './update-success';
import UpdateDate from './update-date/update-date';
import useCreateBackFunctions from './utils/use-create-back-functions';
import { getProfileSuccess } from '../../../../../../../../../redux/profile/actions';

const UpdateAppointment = ({ onClickClose, appointment }) => {
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const stepState = [step, setStep];

  const { onClose, backToServices, backToTimetable } = useCreateBackFunctions(
    setStep,
    onClickClose
  );

  const { title, duration, price, parameter } = appointment.service;

  useEffect(() => {
    dispatch(setAppointmentService({ title, duration, price, parameter }));
    dispatch(getProfileSuccess({ profile: { id } })); // for getting booked appointments. be careful with profile page
  }, [dispatch, title, duration, price, parameter, id]);

  return (
    <Modal onClickClose={onClose}>
      {step === 1 && <UpdateDuration onClickClose={onClose} setStep={setStep} />}
      {step === 2 && (
        <UpdateDate appointment={appointment} onClickClose={backToServices} stepState={stepState} />
      )}
      {step === 3 && (
        <UpdateResult appointment={appointment} onClickClose={backToTimetable} setStep={setStep} />
      )}
      {step === 4 && <UpdateSuccess onClickClose={onClose} />}
    </Modal>
  );
};

export default UpdateAppointment;
