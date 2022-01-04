import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Names from './names';
import Passwords from './passwords';
import Phone from './phone';
import { customerSchema } from './schemas';
import useOnSubmit from './use-on-submit';
import Verification from './verification/verification';

const CustomerCase = ({ goNext, current, disableProgressBar }) => {
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
              {current === 2 && <Names goNext={goNext} {...props} />}
              {current === 3 && <Passwords goNext={goNext} {...props} />}
              {current === 4 && <Phone goNext={goNext} {...props} />}
            </>
          )}
        </Formik>
      )}
      {isVerification && <Verification phone={phone.current} />}
    </>
  );
};

export default CustomerCase;
