import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import CityCustomer from './city-customer';
import Names from '../shared/names';
import Passwords from '../shared/passwords';
import Phone from '../shared/phone';
import { customerSchema } from '../schemas';
import useOnSubmit from '../use-on-submit';
import Verification from '../shared/verification/verification';

const CustomerCase = ({ goToNextStep, current, disableProgressBar }) => {
  const [isVerification, setIsVerification] = useState(false);
  const phone = useRef(null);

  const [handleSubmit, isLoading] = useOnSubmit({ phone, disableProgressBar, setIsVerification });

  return (
    <>
      {!isVerification && (
        <Formik
          validationSchema={customerSchema}
          initialValues={{
            firstName: '',
            lastName: '',
            password: '',
            confirmedPassword: '',
            phone: '',
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <>
              {current === 2 && <Names goToNextStep={goToNextStep} {...props} />}
              {current === 3 && <Passwords goToNextStep={goToNextStep} {...props} />}
              {current === 4 && <CityCustomer goToNextStep={goToNextStep} {...props} />}
              {current === 5 && <Phone goToNextStep={goToNextStep} {...props} />}
            </>
          )}
        </Formik>
      )}
      {isVerification && <Verification phone={phone.current} />}
    </>
  );
};

export default CustomerCase;
