import getCorrectService from '../../components/pages/profile/master-profile/section-cards/booking/booking-services/utils/get-correct-service';
import getIsDisabled from '../../components/pages/profile/master-profile/section-cards/booking/booking-services/utils/get-is-disabled';

import '../../utils/dayjs-plugins';

import { getDateUTC } from '../../components/pages/profile/master-profile/section-cards/booking/booking-timetable/booking-timetable-phone/utils';

describe('Get is Disabled', () => {
  it('unsuitable service', () => {
    const timetable = {
      sessionTime: 120,
      type: 'auto',
      auto: {
        workingDay: { startAt: 480, endAt: 1080 },
        weekends: [6],
        possibleAppointmentsTime: [480, 600, 720, 840, 960],
        exceptions: { 0: [], 1: [], 2: [], 3: [600, 720], 4: [], 5: [], 6: [] },
      },
    };

    const service = {
      duration: 60,
      update: { date: getDateUTC('2021-12-02'), duration: 90, status: 'unsuitable' },
    };

    let bookingAppointment = { time: 600, date: getDateUTC('2021-12-02') };
    let correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-02'),
      isAfterUpdate: false,
    });
    let isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = { time: 600, date: getDateUTC('2021-12-03') };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-03'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, service, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 660, 720],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, service, timetable);
    expect(isDisabled).toBeFalsy();
  });

  it('auto timetable', () => {
    const timetable = { sessionTime: 60, type: 'auto' };

    const service = {
      duration: 120,
      update: { date: getDateUTC('2021-12-02'), duration: 90, status: 'unsuitable' },
    };

    let bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 720],
    };
    let correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    let isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 720,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 720],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 660, 720],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeFalsy();
  });

  it('auto timetable with update', () => {
    const timetable = {
      sessionTime: 60,
      type: 'auto',
      update: {
        type: 'auto',
        sessionTime: 90,
        date: getDateUTC('2021-12-01'),
      },
    };

    const service = {
      duration: 60,
      update: { date: getDateUTC('2021-12-01'), duration: 270, status: 'suitable' },
    };

    let bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 780, 870],
    };
    let correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    let isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      availableAppointments: [600, 690, 780, 870],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeFalsy();
  });

  it('manually timetable', () => {
    const timetable = {
      sessionTime: 120,
      type: 'manually',
      manually: {
        appointments: {
          0: [],
          1: [600],
          2: [600, 720, 960, 1080],
          3: [],
          4: [720, 840],
          5: [600, 720, 960, 1080],
          6: [],
        },
      },
    };

    const service = {
      duration: 240,
      // update: { date: getDateUTC('2021-12-01'), duration: 90, status: 'suitable' },
    };

    let bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      unavailableAppointments: [720],
    };
    let correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    let isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      unavailableAppointments: [960],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeFalsy();
  });

  it('manually timetable with update', () => {
    const timetable = {
      sessionTime: 90,
      type: 'auto',
      update: {
        type: 'manually',
        manually: {
          sessionTime: 120,
          appointments: {
            0: [],
            1: [600],
            2: [600, 720, 960, 1080],
            3: [],
            4: [720, 840],
            5: [600, 720, 960, 1080],
            6: [],
          },
        },
        date: getDateUTC('2021-12-01'),
      },
    };

    const service = {
      duration: 90,
      update: { date: getDateUTC('2021-12-01'), duration: 240, status: 'suitable' },
    };

    let bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      unavailableAppointments: [720],
    };
    let correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    let isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeTruthy();

    bookingAppointment = {
      time: 600,
      date: getDateUTC('2021-12-01'),
      unavailableAppointments: [960],
    };
    correctService = getCorrectService({
      step: 2,
      service,
      today: getDateUTC('2021-12-01'),
      isAfterUpdate: false,
    });
    isDisabled = getIsDisabled(bookingAppointment, correctService, timetable);
    expect(isDisabled).toBeFalsy();
  });
});
