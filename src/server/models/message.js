import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import dialogs from '../pipelines/message/dialogs';

class Message {
  static async getDialogs(userId) {
    const { db } = await connectToDatabase();
    userId = new ObjectId(userId);
    const pipeline = dialogs(userId);
    return await db.collection('messages').aggregate(pipeline).next();
  }
}

export default Message;
