import dayjs from 'dayjs';
import Timetable from '../../components/pages/profile/section-cards/booking/booking-timetable/use-week/timetables/timetable';

const timetable = { sessionTime: 60, update: { sessionTime: 90, date: dayjs('2021-12-02') } };
const appointmentsState = {
  booking: { bookedAppointments: { '02-12-2021': [{ startAt: 720, endAt: 800 }] } },
};

describe('Timetable', () => {
  it('get correct timetable', () => {
    let date = dayjs('2021-12-1').utc(true);
    let correctTimetable = Timetable.getCorrectTimetable(timetable, date);
    expect(correctTimetable.sessionTime).toBe(60);

    date = dayjs('2021-12-2').utc(true);
    correctTimetable = Timetable.getCorrectTimetable(timetable, date);
    expect(correctTimetable.sessionTime).toBe(90);

    date = dayjs('2021-12-3').utc(true);
    correctTimetable = Timetable.getCorrectTimetable(timetable, date);
    expect(correctTimetable.sessionTime).toBe(90);
  });

  it('get booked appointments', () => {
    let date = dayjs('2021-12-2').utc(true);
    let bookedAppointments = Timetable.getBookedAppointmens(appointmentsState, date);
    expect(bookedAppointments).toStrictEqual([{ startAt: 720, endAt: 800 }]);

    date = dayjs('2021-12-1').utc(true);
    bookedAppointments = Timetable.getBookedAppointmens(appointmentsState, date);
    expect(bookedAppointments).toStrictEqual([]);
  });
});
