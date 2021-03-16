import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../database';
import services from '../pipelines/service/services';

class Service {
  static async getServices(masterId) {
    const { db } = await connectToDatabase();
    const data = await db
      .collection('timetables')
      .aggregate(services(new ObjectId(masterId)))
      .toArray();

    let { services: servicesData, timetable } = data[0];

    // indexes or good sort algo, okay?
    // sort subServices
    servicesData = servicesData.map((service) => {
      if (!service.subServices) return service;
      service.subServices.sort((a, b) => a.subOrder - b.subOrder);
      return service;
    });

    // sort services
    servicesData = servicesData.sort((a, b) => a.order - b.order);

    return { services: servicesData, timetable };
  }
}

export default Service;
