import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useServicesForUpdate from './use-services-for-update';
import useOnSubmit from './use-on-submit/use-on-submit';
import UpdateForm from './shared/update-form';
import Modal from '../../../../../base/modal/modal';

const UpdateServicesFromServices = ({ close }) => {
  const [handleSubmit, isLoading] = useOnSubmit(close);
  const services = useServicesForUpdate();
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Modal onClickClose={close}>
      <div className={`booking-services booking-services--update ${isPhone ? '' : 'card'}`}>
        <ModalHeading
          titleDesktopClassName="services__heading"
          title="Обновить услуги"
          onClickClose={close}
        />

        {isLoading && <div className="spinner-with-background" />}

        <Formik enableReinitialize initialValues={{ services }} onSubmit={handleSubmit}>
          {(props) => <UpdateForm {...props} />}
        </Formik>
      </div>
    </Modal>
  );
};

export default UpdateServicesFromServices;
