import { Form, Formik } from 'formik';
import useOnSubmit from '../utils/use-on-submit';
import EditButtons from '../utils/edit-buttons';
import { lastNameSchema } from '../schemas/name';
import ErrorInput from '../../../base/form/error-input';
import useEdit from '../use-edit';

const LastNameEdit = ({ data, setIsEdit }) => {
  const [handleSubmit, isLoading] = useOnSubmit(setIsEdit);
  const { formikRef, handleEdit, closeEdit } = useEdit({ setIsEdit });

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={lastNameSchema}
      initialValues={{
        lastName: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <ErrorInput name="lastName" className="setting-card__input" label="Фамилия" />
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default LastNameEdit;
