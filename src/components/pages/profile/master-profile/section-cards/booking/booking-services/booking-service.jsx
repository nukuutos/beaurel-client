import { useSelector } from 'react-redux';

import Service from '../../../../../services/base/service';
import getIsDisabled from './utils/get-is-disabled';
import getCorrectService from './utils/get-correct-service';
import ChevronRight from '../../../../../../base/icons/chevron-right';

// bookingAppointment.date is utc 00:00:00!!!

// service that can be disabled
const BookingService = ({ service, state, getPickService, isAfterUpdate }) => {
  const timetable = useSelector((state) => state.timetable);

  const { step, date, time, unavailableAppointments, availableAppointments } = state;

  const bookingService = getCorrectService({ step, service, today: date, isAfterUpdate });
  const pickService = getPickService({ ...bookingService, isAfterUpdate });

  const isDisabled = getIsDisabled(
    { time, unavailableAppointments, availableAppointments, date },
    bookingService,
    timetable
  );

  return (
    <div
      className={`service service--hover booking-service ${
        isDisabled ? 'booking-service--disabled' : ''
      } card mt-6`}
      onClick={isDisabled ? null : pickService}
    >
      <Service service={bookingService} />

      <div className="booking-service__arrow">
        <ChevronRight />
      </div>
    </div>
  );
};

export default BookingService;
