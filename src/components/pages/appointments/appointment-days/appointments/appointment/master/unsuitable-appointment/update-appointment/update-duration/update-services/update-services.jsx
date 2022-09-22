import UpdateServiceDuration from './update-service-duration/update-service-duration';
import UpdateSubServiceDuration from './update-sub-service-duration/update-sub-service-duration';

const UpdateServices = ({ state, updateDuration }) => {
  const { service } = state;

  const isServiceParameter = service?.parameter;

  return isServiceParameter ? (
    <UpdateSubServiceDuration service={service} updateDuration={updateDuration} />
  ) : (
    <UpdateServiceDuration service={service} updateDuration={updateDuration} />
  );
};

export default UpdateServices;
