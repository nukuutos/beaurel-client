import { Formik } from 'formik';
import React, { useRef, useState } from 'react';
import Names from './names';
import Passwords from './passwords';
import Phone from './phone';
import { masterSchema } from './schemas';
import Specialization from './specialization';
import useOnSubmit from './use-on-submit';
import Verification from './verification/verification';

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
          }}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <>
              {current === 2 && <Specialization goNext={goNext} {...props} />}
              {current === 3 && <Names goNext={goNext} {...props} />}
              {current === 4 && <Passwords goNext={goNext} {...props} />}
              {current === 5 && <Phone goNext={goNext} {...props} />}
            </>
          )}
        </Formik>
      )}
      {isVerification && <Verification phone={phone.current} />}
    </>
  );
};

export default MasterCase;
