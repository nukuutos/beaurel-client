import { MongoClient } from 'mongodb';

const { DB_USER, DB_CLUSTER, DB_PASSWORD, DB_NAME } = process.env;

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
// }

// if (!MONGODB_DB) {
//   throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
// }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
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
