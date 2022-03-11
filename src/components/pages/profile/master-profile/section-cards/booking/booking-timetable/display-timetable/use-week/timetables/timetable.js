import dayjs from 'dayjs';

class Timetable {
  constructor(sessionTime, possibleAppointmentsTime) {
    this.sessionTime = sessionTime;
    this.availableAppointments = possibleAppointmentsTime; // for certain day
    this.unavailableAppointments = [];
  }

  static getCorrectTimetable(timetable, date) {
    const { update } = timetable;
    if (update?.date?.isSameOrBefore(date)) return timetable.update;
    return timetable;
  }

  static getDataFromAppointmentState(appointmentsState, date) {
    const { bookedAppointments, bookingAppointment } = appointmentsState.booking; // appointments from appointmentsState
    const stringDate = date.format('DD-MM-YYYY');
    const appointments = bookedAppointments[stringDate] || []; // get booked appointments from server for this date

    const { service } = bookingAppointment;

    return { bookedAppointments: appointments, service };
  }

  static getDate({ month, year, day }) {
    return dayjs(`${year}-${month}-${day}`).utc(true); // 00:00:00Z
  }

  getAppointments() {
    const { availableAppointments, unavailableAppointments } = this;
    return { availableAppointments, unavailableAppointments };
  }
}

export default Timetable;
