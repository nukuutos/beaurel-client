import ManuallyTimetable from '../../components/pages/profile/section-cards/booking/booking-timetable/use-week/manually-timetable';

const sessionTime = 60;
const appointments = {
  0: [600, 660, 720, 1020],
  1: [600],
  2: [],
  3: [660, 720, 1020],
  4: [],
  5: [],
  6: [],
};

describe('Manually timetable', () => {
  it('filter with booked appointments', () => {
    const currentWeekday = 0;
    const availableAppointmentsForWeekday = appointments[currentWeekday];
    const manuallyTimetable = new ManuallyTimetable(sessionTime, availableAppointmentsForWeekday);

    const bookedAppointments = [{ startAt: 600, endAt: 780 }];

    manuallyTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);

    expect(manuallyTimetable.availableAppointments).toEqual([1020]);
    expect(manuallyTimetable.unavailableAppointments).toEqual([600, 660, 720]);
  });

  it('filter appointments with service', () => {
    const currentWeekday = 0;
    const availableAppointmentsForWeekday = appointments[currentWeekday];
    const manuallyTimetable = new ManuallyTimetable(sessionTime, availableAppointmentsForWeekday);

    const bookedAppointments = [{ startAt: 660, endAt: 780 }];

    manuallyTimetable.filterAppointmentsWithBookedAppointments(bookedAppointments);
    manuallyTimetable.filterAppointmentsWithService({ duration: 60 });
    expect(manuallyTimetable.availableAppointments).toEqual([600, 1020]);
    expect(manuallyTimetable.unavailableAppointments).toEqual([660, 720]);

    manuallyTimetable.filterAppointmentsWithService({ duration: 120 });
    expect(manuallyTimetable.availableAppointments).toEqual([1020]);
    expect(manuallyTimetable.unavailableAppointments).toEqual([660, 720]);
  });
});
