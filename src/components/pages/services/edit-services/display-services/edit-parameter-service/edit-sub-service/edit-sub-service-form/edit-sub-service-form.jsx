import React from 'react';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { subServiceSchema } from '../../../../../utils/schemas';
import Textarea from '../../../../../../../base/form/textarea';
import Select from '../../../../../../../base/form/select';
import InputIcon from '../../../../../../../base/form/input-icon';
import useOnSubmit from './use-on-submit';
import Loading from '../../../utils/loading';
import ButtonsForm from '../../../utils/buttons-form/buttons-form';
import useDurationOptions from '../../../../../hooks/use-duration-options/use-duration-options';

const EditSubServiceForm = ({ subService, title, setIsEdit }) => {
  const { parameter, duration, price, id } = subService;
  const { sessionTime } = useSelector((state) => state.timetable);
  const [handleSubmit, isLoading] = useOnSubmit({ subService, title, setIsEdit });
  const durationOptions = useDurationOptions();
  const schema = subServiceSchema(sessionTime);

  return (
    <Formik
      initialValues={{
        parameter,
        duration,
        price,
        id,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, ...restFormikProps }) => (
        <Form className="service service--edit-mobile service-parameter">
          <div className="service__side service__side--left">
            <Textarea
              className="edit-service__textarea textarea input"
              type="text"
              name="parameter"
            />
          </div>

          <div className="service__side service__side--right edit-service__side">
            <div className="edit-service__input input--icon ml-4">
              <FontAwesomeIcon className="input__icon" icon="clock" />
              <Select value={values.duration} className="input" name="duration" as="select">
                {durationOptions}
              </Select>
            </div>

            <InputIcon
              type="number"
              name="price"
              inputClassName="input ml-2"
              wrapperClassName="input--icon edit-service__input ml-4"
            >
              <FontAwesomeIcon className="input__icon" icon="ruble-sign" />
            </InputIcon>
          </div>

          {isLoading ? <Loading /> : <ButtonsForm setIsEdit={setIsEdit} {...restFormikProps} />}
        </Form>
      )}
    </Formik>
  );
};

export default EditSubServiceForm;
