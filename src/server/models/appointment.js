import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import customerAppointmentsAndMasters from '../pipelines/appointment/customer-appointments-and-masters';
import masterAppointmentsAndCustomers from '../pipelines/appointment/master-appointments-and-customers';

const getPipeline = (user, status) => {
  let { id: userId, role } = user;

  userId = new ObjectId(userId);

  return role === 'master'
    ? masterAppointmentsAndCustomers(userId, status)
    : customerAppointmentsAndMasters(userId, status);
};

class Appointment {
  static async getAppointments(user, status) {
    const { db } = await connectToDatabase();

    const pipeline = getPipeline(user, status);

    const data = await db.collection('appointments').aggregate(pipeline).next();

    const { appointments } = data;

    const formattedAppointments = this.getFormattedAppointments(appointments);

    return { ...(data || {}), appointments: formattedAppointments };
  }

  static async setAppointmentViewed(masterId) {
    const { db } = await connectToDatabase();
    const findQuery = { masterId: new ObjectId(masterId), status: 'onConfirmation' };
    const updateQuery = { $set: { 'isViewed.master': true } };
    await db.collection('appointments').updateMany(findQuery, updateQuery);
  }

  static getFormattedAppointments(daysWithAppointments) {
    if (!daysWithAppointments) return {};

    daysWithAppointments = daysWithAppointments.map(({ date, appointments }) => ({
      date: dayjs(date).utc().add(1, 'day'), // prevent utc +0.:00
      appointments: appointments.map(({ date, ...rest }) => {
        date = dayjs(date).utc().add(1, 'day').toDate();
        return { ...rest, date };
      }),
    }));

    const sortedDaysWithAppointments = daysWithAppointments.sort((a, b) =>
      a.date.isBefore(b.date) ? -1 : 1
    );

    const formattedAppointments = {};

    for (const day of sortedDaysWithAppointments) {
      const { date, appointments } = day;
      const stringDate = date.format('DD-MM-YYYY');
      formattedAppointments[stringDate] = appointments;
      // console.log(date.format(), stringDate);
    }

    return formattedAppointments;
  }
}

export default Appointment;
