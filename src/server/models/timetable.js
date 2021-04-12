import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';

class Timetable {
  static async findOne(query, projection = null) {
    const { db } = await connectToDatabase();

    if (query.masterId) query.masterId = new ObjectId(query.masterId);

    const data = await db.collection('timetables').findOne(query, { projection: projection });

    if (data.masterId) data.masterId = String(data.masterId);
    if (data._id) data._id = String(data._id);
    if (data.update && data.update.date) data.update.date = String(data.update.date);

    return data;
  }
}

export default Timetable;
