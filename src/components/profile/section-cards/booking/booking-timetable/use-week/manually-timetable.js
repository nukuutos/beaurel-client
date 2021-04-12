import Timetable from './timetable';

class ManuallyTimetable extends Timetable {
  constructor(sessionTime, possibleAppointmentsTime) {
    super(sessionTime, possibleAppointmentsTime);
  }

  filterAppointmentsWithBookedAppointments(bookedAppointments) {
    // filter possible times by compare booking times with possible times for this date
    const bookedAppointmentsCount = bookedAppointments.length;

    for (let i = 0; i < bookedAppointmentsCount; i++) {
      const bookedTime = bookedAppointments[i];
      const { startAt, endAt } = bookedTime;

      this.availableAppointments = this.availableAppointments.filter((time) => {
        if (time < startAt || endAt <= time) return true;
        this.unavailableAppointments.push(time); // for service case
      });
    }
  }

  filterAppointmentsWithService(service) {
    const { duration } = service;

    this.availableAppointments = this.availableAppointments.filter((startAt) => {
      const endAt = startAt + duration;
      const unavailableAppointmentsLength = this.unavailableAppointments.length;

      if (!unavailableAppointmentsLength) return true;

      for (let i = 0; i < unavailableAppointmentsLength; i++) {
        const unavailableTime = this.unavailableAppointments[i];
        if (endAt <= unavailableTime) return true;
        if (startAt <= unavailableTime && unavailableTime < endAt) return false;
      }

      return true;
    });
  }
}

export default ManuallyTimetable;
