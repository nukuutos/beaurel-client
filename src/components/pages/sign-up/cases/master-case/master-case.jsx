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

const MasterCase = ({ goNext, current, disableProgressBar }) => {
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
              {current === 2 && <Specialization goNext={goNext} {...props} />}
              {current === 3 && <Names goNext={goNext} {...props} />}
              {current === 4 && <Passwords goNext={goNext} {...props} />}
              {current === 5 && <PlaceOfWork goNext={goNext} {...props} />}
              {current === 6 && <Phone goNext={goNext} {...props} />}
            </Form>
          )}
        </Formik>
      )}
      {isVerification && <Verification phone={phone.current} />}
    </>
  );
};

export default MasterCase;
