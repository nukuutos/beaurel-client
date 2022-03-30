import React from 'react';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Textarea from '../../../../../../base/form/textarea';
import Select from '../../../../../../base/form/select';
import InputIcon from '../../../../../../base/form/input-icon';
import { serviceSchema } from '../../../../utils/schemas';
import useOnSubmit from './use-on-submit';
import Loading from '../../utils/loading';
import ButtonsForm from '../../utils/buttons-form/buttons-form';
import DurationOptions from '../../../../duration-options/duration-options';

const EditServiceForm = ({ service, setIsEdit }) => {
  const { title, duration, price } = service;

  const [handleSubmit, isLoading] = useOnSubmit(service, setIsEdit);

  return (
    <Formik
      initialValues={{ title, duration, price }}
      validationSchema={serviceSchema}
      onSubmit={handleSubmit}
    >
      {({ values, ...restFormikProps }) => (
        <Form className="service service--edit-mobile card mt-6">
          <div className="service__side service__side--left">
            <Textarea className="edit-service__textarea textarea input" type="text" name="title" />
          </div>

          <div className="service__side service__side--right edit-service__side">
            <div className="edit-service__input input--icon ml-4">
              <FontAwesomeIcon className="input__icon" icon="clock" />
              <Select value={values.duration} className="input" name="duration" as="select">
                <DurationOptions />
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

export default EditServiceForm;
