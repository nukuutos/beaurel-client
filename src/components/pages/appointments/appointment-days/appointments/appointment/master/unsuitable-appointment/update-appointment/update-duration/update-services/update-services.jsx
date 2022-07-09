import React from 'react';
import { useSelector } from 'react-redux';
import UpdateServiceDuration from './update-service-duration/update-service-duration';
import UpdateSubServiceDuration from './update-sub-service-duration/update-sub-service-duration';

const UpdateServices = ({ setStep }) => {
  const service = useSelector((state) => state.appointments.booking.bookingAppointment.service);

  const isServiceParameter = service?.parameter;

  return isServiceParameter ? (
    <UpdateSubServiceDuration setStep={setStep} />
  ) : (
    <UpdateServiceDuration setStep={setStep} />
  );
};

export default UpdateServices;
