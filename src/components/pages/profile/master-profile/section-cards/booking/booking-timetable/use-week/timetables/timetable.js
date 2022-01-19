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

    return [appointments, service];
  }

  getAppointments() {
    return [this.availableAppointments, this.unavailableAppointments];
  }
}

export default Timetable;
