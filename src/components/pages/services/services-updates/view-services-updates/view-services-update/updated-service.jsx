import Service from '../../../base/service';

const UpdatedService = ({ service }) => (
  <div className="service service--hover card mt-6">
    <Service service={service} />
  </div>
);

export default UpdatedService;
