import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import masterAppointmentsAndCustomers from '../pipelines/appointment/master-appointments-and-customers';

const sortDays = (appointmentsDays) =>
  Object.keys(appointmentsDays)
    .map((date) => dayjs(date, 'DD-MM-YYYY'))
    .sort((a, b) => a.diff(b))
    .map((date) => date.format('DD-MM-YYYY'))
    .reduce((obj, key) => {
      obj[key] = appointmentsDays[key];
      return obj;
    }, {});

class Appointment {
  static async getMasterAppointmentsAndCustomers(masterId, status) {
    const { db } = await connectToDatabase();

    const data = await db
      .collection('appointments')
      .aggregate(masterAppointmentsAndCustomers(new ObjectId(masterId), status))
      .toArray();

    const sortedAppontments = data[0] ? sortDays(data[0]) : {};

    return sortedAppontments;
  }
}

export default Appointment;
