class Timetable {
  constructor(sessionTime, possibleAppointmentsTime) {
    this.sessionTime = sessionTime;
    this.availableAppointments = possibleAppointmentsTime; // for certain day
    this.unavailableAppointments = [];
  }

  getAppointments() {
    return [this.availableAppointments, this.unavailableAppointments];
  }
}

export default Timetable;
