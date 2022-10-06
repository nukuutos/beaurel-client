import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../database';

import masterProfile from '../../pipelines/user/master-profile';
import masters from '../../pipelines/user/masters';
import mastersWithFavorites from '../../pipelines/user/masters-with-favorites';
import favoriteMasters from '../../pipelines/user/favorite-masters';
import customerProfile from '../../pipelines/user/customer-profile';
import settings from '../../pipelines/settings/settings';
import { getCustomerMatchQuery, getMasterMatchQuery, handleUserId } from './utils';
import notifications from '../../pipelines/user/notifications';

class User {
  static async findMasters(city) {
    const { db } = await connectToDatabase();
    const pipeline = masters(city);
    const data = await db.collection('users').aggregate(pipeline).toArray();
    return { masters: data, favoriteMasters: [] };
  }

  static async findMastersWithFavorites(userId, city) {
    const { db } = await connectToDatabase();
    const pipeline = mastersWithFavorites(new ObjectId(userId), city);
    const data = await db.collection('users').aggregate(pipeline).next();
    return data;
  }

  static async getFavoriteMasters(userId) {
    const { db } = await connectToDatabase();
    const pipeline = favoriteMasters(new ObjectId(userId));
    const globalData = await db.collection('users').aggregate(pipeline).next();
    return globalData;
  }

  static async getMasterProfile(masterId, userId) {
    const { db } = await connectToDatabase();
    const masterMatchQuery = getMasterMatchQuery(masterId);

    userId = handleUserId(userId);

    const profile = await db
      .collection('users')
      .aggregate(masterProfile(masterMatchQuery, userId))
      .next();

    return profile;
  }

  static async getCustomerProfile(customerId) {
    const { db } = await connectToDatabase();

    const customerMatchQuery = getCustomerMatchQuery(customerId);

    const profile = await db
      .collection('users')
      .aggregate(customerProfile(customerMatchQuery))
      .next();

    return profile;
  }

  static async getAuthData(userId) {
    const { db } = await connectToDatabase();
    const pipeline = settings(new ObjectId(userId));
    const data = await db.collection('users').aggregate(pipeline).next();
    return data;
  }

  static async getCity(userId) {
    const { db } = await connectToDatabase();
    const findQuery = { _id: new ObjectId(userId) };
    const projection = { city: 1 };
    const data = await db.collection('users').findOne(findQuery, projection);
    const city = data?.city || 'Хабаровск';
    return city;
  }

  static async getDataForTokens(userId) {
    const { db } = await connectToDatabase();
    const projection = { _id: 0, role: 1, username: 1 };
    const userData = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) }, { projection });

    if (!userData) throw new Error('Invalid token!');
    return { _id: userId, ...userData };
  }

  static async getNotifications(userId) {
    const { db } = await connectToDatabase();

    const pipeline = notifications(new ObjectId(userId));

    const data = await db.collection('users').aggregate(pipeline).next();

    return data;
  }
}

export default User;
