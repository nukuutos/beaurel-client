import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';

import profileAndReviews from '../pipelines/user/profile-and-reviews';
import masters from '../pipelines/user/masters';
import mastersWithFavorites from '../pipelines/user/masters-with-favorites';
import favoriteMasters from '../pipelines/user/favorite-masters';

class User {
  // it doesnt recognize favarite masters (get every master without recognition)
  static async findMasters(query = {}) {
    const { db } = await connectToDatabase();
    const data = await db.collection('users').aggregate(masters(query)).toArray();
    return data;
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

  static async getMasterProfile(masterId) {
    const { db } = await connectToDatabase();

    const profile = await db
      .collection('users')
      .aggregate(profileAndReviews(new ObjectId(masterId)))
      .toArray();

    console.log(profile[0].reviews);

    return profile[0];
  }
}

export default User;
