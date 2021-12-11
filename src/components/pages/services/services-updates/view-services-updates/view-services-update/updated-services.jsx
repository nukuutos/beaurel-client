import UpdatedParameterService from './updated-parameter-service/updated-parameter-service';
import UpdatedService from './updated-service';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useServicesUpdate from '../utils/use-services-update';

const UpdatedServices = ({ close }) => {
  const updatedServices = useServicesUpdate();

  return (
    <div className="booking-services card">
      <ModalHeading titleDesktopClassName="services__heading" title="Услуги" onClickClose={close} />

      <div className="services__container">
        {updatedServices.map((service) =>
          service.subServices ? (
            <UpdatedParameterService key={service.title} service={service} />
          ) : (
            <UpdatedService key={service.title} service={service} />
          )
        )}
      </div>
    </div>
  );
};

export default UpdatedServices;
