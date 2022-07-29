import { MongoClient } from 'mongodb';
import getURI from './utils/get-uri';

const { DB_NAME } = process.env;

const MONGODB_URI = getURI();

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => ({
      client,
      db: client.db(DB_NAME),
    }));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
