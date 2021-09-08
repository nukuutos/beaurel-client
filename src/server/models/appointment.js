import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../database";
import masterAppointmentsAndCustomers from "../pipelines/appointment/master-appointments-and-customers";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const sortDays = (appointmentsDays) =>
  Object.keys(appointmentsDays)
    .map((date) => dayjs(date, "DD-MM-YYYY"))
    .sort((a, b) => a.diff(b))
    .map((date) => date.format("DD-MM-YYYY"))
    .reduce((obj, key) => {
      obj[key] = appointmentsDays[key];
      return obj;
    }, {});

class Appointment {
  static async getMasterAppointmentsAndCustomers(masterId, status) {
    const { db } = await connectToDatabase();
    const data = await db
      .collection("appointments")
      .aggregate(masterAppointmentsAndCustomers(new ObjectId(masterId), status))
      .toArray();

    const sortedAppontments = data[0] ? sortDays(data[0]) : {};

    return sortedAppontments;
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
