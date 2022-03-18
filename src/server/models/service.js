import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import services from '../pipelines/service/services';

class Service {
  static async getServices(masterId) {
    const { db } = await connectToDatabase();
    const pipeline = services(new ObjectId(masterId));
    const data = await db.collection('timetables').aggregate(pipeline).next();
    const { timetable, services: unsortedServices } = data || {};
    const sortedServices = this.sortServices(unsortedServices);
    return { ...data, services: sortedServices, timetable: timetable || [] };
  }

  static sortServices(services) {
    if (!services) return [];
    // sort sub services
    services = services.map((service) => {
      if (!service.subServices) return service;
      service.subServices.sort((a, b) => a.subOrder - b.subOrder);
      return service;
    });
    // sort services
    return services.sort((a, b) => a.order - b.order);
  }
}

export default Service;
