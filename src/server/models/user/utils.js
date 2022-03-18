import { ObjectId } from 'mongodb';

export const getMasterMatchQuery = (masterId) =>
  ObjectId.isValid(masterId)
    ? { _id: new ObjectId(masterId), role: 'master' }
    : { username: masterId, role: 'master' };

export const getCustomerMatchQuery = (customerId) =>
  ObjectId.isValid(customerId)
    ? { _id: new ObjectId(customerId), role: 'customer' }
    : { username: customerId, role: 'customer' };

export const handleUserId = (userId) => (userId ? new ObjectId(userId) : null);
