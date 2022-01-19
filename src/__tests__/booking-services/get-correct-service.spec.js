import dayjs from 'dayjs';
import '../../utils/dayjs-plugins';
import getCorrectService from '../../components/pages/profile/master-profile/section-cards/booking/booking-services/utils/get-correct-service';

describe('Get correct service', () => {
  it('Timetable is fisrt step', () => {
    const currentService = {
      duration: 60,
      update: { date: dayjs('2021-12-02'), duration: 90, status: 'suitable' },
    };

    let service = getCorrectService({
      step: 2,
      service: currentService,
      today: dayjs('2021-12-01').utc(true),
      isAfterUpdate: false,
    });

    expect(service.duration).toBe(60);

    service = getCorrectService({
      step: 2,
      service: currentService,
      today: dayjs('2021-12-02').utc(true),
      isAfterUpdate: false,
    });

    expect(service.duration).toBe(90);

    service = getCorrectService({
      step: 2,
      service: currentService,
      today: dayjs('2021-12-03').utc(true),
      isAfterUpdate: false,
    });

    expect(service.duration).toBe(90);

    service = getCorrectService({
      step: 1, // services is fisrt step
      service: currentService,
      today: dayjs('2021-12-01').utc(true),
      isAfterUpdate: true,
    });

    expect(service.duration).toBe(90);
  });

  it('Service is first step', () => {
    const currentService = {
      duration: 60,
      update: { date: dayjs('2021-12-02'), duration: 90, status: 'suitable' },
    };

    let service = getCorrectService({
      step: 1,
      service: currentService,
      today: dayjs('2021-12-02').utc(true),
      isAfterUpdate: true,
    });

    expect(service.duration).toBe(90);

    service = getCorrectService({
      step: 1,
      service: currentService,
      today: dayjs('2021-12-01').utc(true),
      isAfterUpdate: false,
    });

    expect(service.duration).toBe(60);
  });
});
