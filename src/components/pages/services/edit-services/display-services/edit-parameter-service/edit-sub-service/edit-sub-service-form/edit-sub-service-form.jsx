import { Formik } from 'formik';
import { subServiceSchema } from '../../../../../utils/schemas';
import useOnSubmit from './use-on-submit';
import Parameter from './parameter';
import EditForm from '../../../shared/edit-form/edit-form';

const EditSubServiceForm = ({ subService, title, setIsEdit }) => {
  const { parameter, duration, price, id } = subService;
  const [handleSubmit] = useOnSubmit({ subService, title, setIsEdit });

  return (
    <Formik
      initialValues={{
        parameter,
        duration,
        price,
        id,
      }}
      validationSchema={subServiceSchema}
      onSubmit={handleSubmit}
    >
      {({ ...props }) => (
        <EditForm
          className="service service--edit-mobile service-parameter"
          setIsEdit={setIsEdit}
          {...props}
        >
          <Parameter />
        </EditForm>
      )}
    </Formik>
  );
};

export default EditSubServiceForm;
