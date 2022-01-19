import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';

import profileAndReviews from '../pipelines/user/profile-and-reviews';
import masters from '../pipelines/user/masters';
import mastersWithFavorites from '../pipelines/user/masters-with-favorites';
import favoriteMasters from '../pipelines/user/favorite-masters';
import customerProfile from '../pipelines/user/customer-profile';

class User {
  // it doesnt recognize favarite masters (get every master without recognition)
  static async findMasters() {
    const { db } = await connectToDatabase();
    const data = await db.collection('users').aggregate(masters()).toArray();
    return { masters: data, favoriteMasters: [] };
  }

  // it recognizes favorite masters (get every master and recognize favorite)
  static async findMastersWithFavorites(userId) {
    const { db } = await connectToDatabase();
    const data = await db
      .collection('users')
      .aggregate(mastersWithFavorites(new ObjectId(userId)))
      .toArray();

    return data[0];
  }

  // get only favorite masters
  static async getFavoriteMasters(userId) {
    const { db } = await connectToDatabase();

    const data = await db
      .collection('users')
      .aggregate(favoriteMasters(new ObjectId(userId)))
      .toArray();

    return data[0];
  }

  static async getMasterProfile(masterId, userId) {
    const { db } = await connectToDatabase();

    const masterMatchQuery = ObjectId.isValid(masterId)
      ? { _id: new ObjectId(masterId), role: 'master' }
      : { username: masterId, role: 'master' };

    userId = userId ? new ObjectId(userId) : null;

    const profile = await db
      .collection('users')
      .aggregate(profileAndReviews(masterMatchQuery, userId))
      .next();

    return profile;
  }

  static async getCustomerProfile(customerId) {
    const { db } = await connectToDatabase();
    const customerMatchQuery = ObjectId.isValid(customerId)
      ? { _id: new ObjectId(customerId), role: 'customer' }
      : { username: customerId, role: 'customer' };

    const profile = await db
      .collection('users')
      .aggregate(customerProfile(customerMatchQuery))
      .next();

    if (!profile.appointmentsData.appointmentsCount) {
      profile.appointmentsData.appointmentsCount = 0;
    }

    return profile;
  }

  static async getAuthData(userId) {
    const { db } = await connectToDatabase();

    const query = { _id: new ObjectId(userId) };
    const projection = { _id: 0, username: 1, firstName: 1, lastName: 1, email: 1, phone: 1 };

    const data = await db.collection('users').findOne(query, { projection });

    return data;
  }
}

export default User;
