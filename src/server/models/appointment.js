import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import masterAppointmentsAndCustomers from '../pipelines/appointment/master-appointments-and-customers';

class Appointment {
  static async getMasterAppointmentsAndCustomers(masterId, status) {
    const { db } = await connectToDatabase();
    const data = await db
      .collection('appointments')
      .aggregate(masterAppointmentsAndCustomers(new ObjectId(masterId), status))
      .toArray();

    return data;
  }

  // static async find(query, projection = null) {
  //   const { db } = await connectToDatabase();

  //   if (query.masterId) query.masterId = new ObjectId(query.masterId);

  //   let appointments = await db.collection('appointments').find(query, { projection: projection }).toArray();

  //   appointments = appointments.map((appointment) => {
  //     if (appointment._id) appointment._id = String(appointment._id);
  //     if (appointment.masterId) appointment.masterId = String(appointment.masterId);
  //     if (appointment.date) appointment.date = String(appointment.date);
  //     if (appointment.createdAt) appointment.createdAt = String(appointment.createdAt);

  //     return appointment;
  //   });

  //   return appointments;
  // }
}

export default Appointment;
