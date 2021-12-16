import getIdsAndOrders from '../../../../components/pages/services/utils/get-ids-and-orders';
import toDayjs from '../../utils/to-dayjs';

const getServices = (state, payload) => {
  const { masterId, services } = payload;

  const transformedServices = toDayjs(services);
  const initialOrder = getIdsAndOrders(services);

  return {
    ...state,
    masterId,
    initialOrder,
    services: transformedServices,
  };
};

export default getServices;
