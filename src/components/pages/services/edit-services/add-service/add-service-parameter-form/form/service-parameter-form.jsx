import { FieldArray, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { parameterServiceSchema } from '../../../../utils/schemas';
import getFormClassName from './get-form-class-name';
import Title from './title';
import SubService from './sub-service';
import AddSubServiceButton from './add-sub-service-button';

const ServiceParameterForm = ({ handleSubmit }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  return (
    <Formik
      initialValues={{
        title: '',
        subServices: [
          {
            parameter: '',
            duration: sessionTime,
            price: '',
            updateDuration: update?.sessionTime || null,
          },
        ],
      }}
      validationSchema={parameterServiceSchema(sessionTime, update?.sessionTime)}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const formClassName = getFormClassName(values.subServices);

        return (
          <Form className={formClassName}>
            <Title />
            <FieldArray name="subServices">
              {(arrayProps) => (
                <>
                  {values.subServices.map((subService, i) => (
                    <SubService subService={subService} index={i} {...arrayProps} />
                  ))}
                  <AddSubServiceButton {...arrayProps} />
                </>
              )}
            </FieldArray>
            <button className="add-service__button mt-9 btn btn--primary" type="submit">
              Добавить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ServiceParameterForm;
