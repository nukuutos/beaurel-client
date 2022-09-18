import getIdsAndOrders from '../../../../components/pages/services/utils/get-ids-and-orders';
import serializeService from '../../utils/serialize-service';

const getServices = (state, payload) => {
  const { masterId, services } = payload;

  const transformedServices = serializeService(services);
  const initialOrder = getIdsAndOrders(services);

  return {
    ...state,
    masterId,
    initialOrder,
    services: transformedServices,
  };
};

export default getServices;
