import { getDateUTC } from '../booking-timetable/booking-timetable-phone/utils';

const getServicesUpdateDate = (services) => {
  for (const service of services) {
    const isServiceParameter = service.subServices;

    if (isServiceParameter) {
      for (const subService of service.subServices) {
        if (subService?.update?.date) {
          return getDateUTC(subService.update.date);
        }
      }
    }

    if (service?.update?.date) {
      return getDateUTC(service.update.date);
    }
  }

  return null;
};

export default getServicesUpdateDate;
