import UpdatedParameterService from './updated-parameter-service/updated-parameter-service';
import UpdatedService from './updated-service';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useServicesUpdate from '../utils/use-services-update';
import Modal from '../../../../../base/modal/modal';

const UpdatedServices = ({ close }) => {
  const updatedServices = useServicesUpdate();

  return (
    <Modal onClickClose={close}>
      <div className="booking-services booking-services--update card">
        <ModalHeading
          titleDesktopClassName="services__heading"
          title="Услуги"
          onClickClose={close}
        />

        <div className="services__container services__container--update">
          {updatedServices.map((service) =>
            service.subServices ? (
              <UpdatedParameterService key={service.title} service={service} />
            ) : (
              <UpdatedService key={service.title} service={service} />
            )
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdatedServices;
