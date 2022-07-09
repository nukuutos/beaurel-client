import { Form, Formik } from 'formik';
import useOnSubmit from './use-on-submit';
import EditButtons from '../utils/edit-buttons';
import usernameSchema from '../schemas/username';
import ErrorInput from '../../../base/form/error-input';
import useEdit from '../use-edit';

const UsernameEdit = ({ data, setIsEdit }) => {
  const [handleSubmit, isLoading] = useOnSubmit(setIsEdit);
  const { handleEdit, closeEdit, formikRef } = useEdit({ setIsEdit });

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={usernameSchema}
      initialValues={{
        username: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <ErrorInput name="username" className="setting-card__input" label="username" />
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default UsernameEdit;
