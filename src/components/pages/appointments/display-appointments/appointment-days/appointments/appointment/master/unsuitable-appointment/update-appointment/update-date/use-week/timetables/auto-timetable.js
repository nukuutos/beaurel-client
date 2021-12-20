import Timetable from './timetable';

class AutoTimetable extends Timetable {
  constructor(sessionTime, possibleAppointmentsTime, weekends, exceptions) {
    super(sessionTime, possibleAppointmentsTime);
    this.weekends = weekends;
    this.exceptions = exceptions;
  }

  checkWeekend(weekdayIndexRU) {
    return this.weekends.includes(weekdayIndexRU);
  }

  filterAppointmentsWithBookedAppointments(bookedAppointments) {
    const availableAppointments = [...this.availableAppointments];
    const bookedAppointmentsCount = bookedAppointments.length;

    for (let i = 0; i < bookedAppointmentsCount; i++) {
      const bookedTime = bookedAppointments[i];
      const { startAt, endAt } = bookedTime;

      const startIndex = availableAppointments.indexOf(startAt);
      const deleteCount = (endAt - startAt) / this.sessionTime;
      availableAppointments.splice(startIndex, deleteCount);
    }

    this.availableAppointments = availableAppointments;

    return this;
  }

  filterAppointmentsWithExceptions(weekdayIndexRU) {
    const availableAppointments = [...this.availableAppointments];
    const dayExceptions = this.exceptions[weekdayIndexRU];
    const exceptionsLength = dayExceptions.length;

    if (!exceptionsLength) return this;
    for (let i = 0; i < exceptionsLength; i++) {
      const exceptionTime = dayExceptions[i];
      const startIndex = availableAppointments.indexOf(exceptionTime);
      availableAppointments.splice(startIndex, 1);
    }

    this.availableAppointments = availableAppointments;

    return this;
  }

  filterAppointmentsWithService(service) {
    const { duration } = service;

    this.availableAppointments = this.availableAppointments.filter((startAt) => {
      const endAt = startAt + Number(duration);

      for (let i = startAt; i < endAt; i += this.sessionTime) {
        if (!this.availableAppointments.includes(i)) return false;
      }

      return true;
    });

    return this;
  }
}

export default AutoTimetable;
