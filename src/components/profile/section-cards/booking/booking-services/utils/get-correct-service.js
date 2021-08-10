import { getDateUTC, getUpdateDate } from "../../booking-timetable/booking-phone-timetable/utils";

const getCorrectService = (service, today = null, isUpdated) => {
  if (isUpdated) {
    const newService = { ...service };
    newService.duration = newService.update.duration;

    return newService;
  }

  const { update } = service;

  if (!update || !update.date || !today) return service;

  const updateDate = getUpdateDate(update);
  today = today || getDateUTC();

  if (service.parameter) console.log(service);

  if (!today.isBefore(updateDate) && update.status === "suitable") {
    const newService = { ...service };
    newService.duration = newService.update.duration;
    return newService;
  }

  return service;
};

export default getCorrectService;
