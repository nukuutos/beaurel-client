import Service from '../../service';

const ViewService = ({ service }) => {
  return (
    <div className="service service--hover card mt-6">
      <Service service={service} />
    </div>
  );
};

export default ViewService;
