import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import useOnSubmit from '../use-on-submit/use-on-submit';
import useGetUnsuitableServices from './use-get-unsuitable-services';
import UpdateForm from '../shared/update-form';

const UpdateServicesFromTimetable = ({ close }) => {
  const { isPhone } = useSelector((state) => [state.timetable.update, state.screenSize]);
  const [unsuitableServices, isLoading] = useGetUnsuitableServices();
  const [handleSubmit] = useOnSubmit(close);

  const desktopClassName = isPhone ? '' : 'card';

  return isLoading ? (
    <div className={`booking-services booking-services--update ${desktopClassName}`}>
      <div className="spinner-with-background" />
    </div>
  ) : (
    <div className={`booking-services booking-services--update ${desktopClassName}`}>
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
