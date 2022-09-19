import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Names from '../shared/names';
import Passwords from '../shared/passwords';
import Phone from '../shared/phone';
import PlaceOfWork from './place-of-work';
import { masterSchema } from '../schemas';
import Specialization from './specialization';
import useOnSubmit from '../use-on-submit';
import Verification from '../shared/verification/verification';

const MasterCase = ({ goToNextStep, current, disableProgressBar }) => {
  const [isVerification, setIsVerification] = useState(false);
  const phone = useRef(null);

  const [handleSubmit, isLoading] = useOnSubmit({ phone, disableProgressBar, setIsVerification });

  return (
    <>
      {!isVerification && (
        <Formik
          validationSchema={masterSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            password: '',
            confirmedPassword: '',
            specialization: '',
            phone: '',
            placeOfWork: {
              street: '',
              house: '',
              floor: '',
              building: '',
              room: { type: 'cabinet', value: '' },
            },
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form className="sign-up__form">
              {current === 2 && <Specialization goToNextStep={goToNextStep} {...props} />}
              {current === 3 && <Names goToNextStep={goToNextStep} {...props} />}
              {current === 4 && <Passwords goToNextStep={goToNextStep} {...props} />}
              {current === 5 && <PlaceOfWork goToNextStep={goToNextStep} {...props} />}
              {current === 6 && <Phone goToNextStep={goToNextStep} {...props} />}
            </Form>
          )}
        </Formik>
      )}
      {isVerification && <Verification phone={phone.current} />}
    </>
  );
};

export default MasterCase;
