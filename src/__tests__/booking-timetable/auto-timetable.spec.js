import AutoTimetable from '../../components/pages/profile/master-profile/section-cards/booking/booking-timetable/display-timetable/use-week/timetables/auto-timetable';

const sessionTime = 60;
const possibleAppointmentsTime = [600, 660, 720, 780, 840, 900, 960, 1020]; // 10:00 - 18:00
const weekends = [5, 6]; // sat, sun
const exceptions = { 0: [780], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

describe('Auto timetable', () => {
  it('is weekend', () => {
    const autoTimetable = new AutoTimetable(
      sessionTime,
      possibleAppointmentsTime,
      weekends,
      exceptions
    );

    let isWeekend = autoTimetable.checkWeekend(5);
    expect(isWeekend).toBeTruthy();

    isWeekend = autoTimetable.checkWeekend(6);
    expect(isWeekend).toBeTruthy();

    isWeekend = autoTimetable.checkWeekend(0);
    expect(isWeekend).toBeFalsy();

    isWeekend = autoTimetable.checkWeekend(3);
    expect(isWeekend).toBeFalsy();
  });

  it('filter appointments with booked appointments', () => {
    const autoTimetable = new AutoTimetable(
      sessionTime,
      possibleAppointmentsTime,
      weekends,
      exceptions
    );

    const bookedAppointments = [
      { startAt: 600, endAt: 660 },
      { startAt: 720, endAt: 780 },
      { startAt: 900, endAt: 1020 },
    ];

    autoTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

    expect(autoTimetable.availableAppointments).toEqual([660, 780, 840, 1020]);
  });

  it('filter appointments with exceptions', () => {
    const autoTimetable = new AutoTimetable(
      sessionTime,
      possibleAppointmentsTime,
      weekends,
      exceptions
    );

    let weekday = 1;
    autoTimetable.filterAppointmentsWithExceptions(weekday);
    expect(autoTimetable.availableAppointments).toEqual(possibleAppointmentsTime);

    weekday = 0;
    autoTimetable.filterAppointmentsWithExceptions(weekday);
    expect(autoTimetable.availableAppointments).toEqual([600, 660, 720, 840, 900, 960, 1020]);
  });

  it('filter appointments with service', () => {
    const autoTimetable = new AutoTimetable(
      sessionTime,
      possibleAppointmentsTime,
      weekends,
      exceptions
    );

    const bookedAppointments = [
      { startAt: 600, endAt: 660 },
      { startAt: 720, endAt: 780 },
      { startAt: 900, endAt: 1020 },
    ];

    // [660, 780, 840, 1020]
    autoTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);
    autoTimetable.filterAppointmentsWithService({ duration: 60 });
    expect(autoTimetable.availableAppointments).toEqual([660, 780, 840, 1020]);

    autoTimetable.filterAppointmentsWithService({ duration: 120 });
    expect(autoTimetable.availableAppointments).toEqual([780]);
  });
});
