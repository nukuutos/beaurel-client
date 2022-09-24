import { Formik } from 'formik';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import useOnSubmit from '../use-on-submit/use-on-submit';
import useGetUnsuitableServices from './use-get-unsuitable-services';
import UpdateForm from '../shared/update-form';

const UpdateServicesFromTimetable = ({ close }) => {
  const [unsuitableServices, isLoading] = useGetUnsuitableServices();
  const [handleSubmit] = useOnSubmit(close);

  return isLoading ? (
    <div className="booking-services booking-services--update">
      <div className="spinner-with-background" />
    </div>
  ) : (
    <div className="booking-services booking-services--update">
      <ModalHeading titleDesktopClassName="services__heading" title="Услуги" onClickClose={close} />
      <Formik
        enableReinitialize
        initialValues={{ services: unsuitableServices }}
        onSubmit={handleSubmit}
      >
        {(props) => <UpdateForm {...props} />}
      </Formik>
    </div>
  );
};

export default UpdateServicesFromTimetable;
