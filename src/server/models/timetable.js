import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import timetable from '../pipelines/timetable/timetable';

class Timetable {
  static async getData(masterId) {
    const { db } = await connectToDatabase();
    const pipeline = timetable(new ObjectId(masterId));
    const data = await db.collection('timetables').aggregate(pipeline).next();
    return data || {};
  }
}

export default Timetable;
