import { Form, Formik } from 'formik';
import useOnSubmit from '../utils/use-on-submit';
import EditButtons from '../utils/edit-buttons';
import { firstNameSchema } from '../schemas/name';
import useEdit from '../use-edit';
import ErrorInput from '../../../base/form/error-input';

const FirstNameEdit = ({ data, setIsEdit }) => {
  const [handleSubmit, isLoading] = useOnSubmit(setIsEdit);
  const { formikRef, handleEdit, closeEdit } = useEdit({ setIsEdit });

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={firstNameSchema}
      initialValues={{
        firstName: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <ErrorInput name="firstName" className="setting-card__input" label="Имя" />
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default FirstNameEdit;
