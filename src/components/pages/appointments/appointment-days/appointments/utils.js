import CustomerAppointment from './appointment/customer-appointment';
import MasterAppointment from './appointment/master-appointment';

export const getIsAbleToFetch = (appointments) => {
  const minLengthToFetchAppointments = 10;

  let appointmentsCount = 0;
  for (const date in appointments) {
    const appointmentLength = appointments[date].length;
    appointmentsCount += appointmentLength;
  }
  const isAbleToFetch = appointmentsCount >= minLengthToFetchAppointments;
  return isAbleToFetch;
};

export const getAppointmentComponentByUser = (user) =>
  user === 'master' ? MasterAppointment : CustomerAppointment;

export const getIsLastAppointment = ({ isAbleToFetch, isLastDate, isLastAppointmentOnDay }) => {
  const isLastAppointment = isAbleToFetch && isLastDate && isLastAppointmentOnDay;
  return isLastAppointment;
};
