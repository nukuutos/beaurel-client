import dynamic from 'next/dynamic';
import React, { useState } from 'react';

import Layout from '../components/layout/layout';
import useProgress from '../components/pages/sign-up/use-progress';

const ChoiceCards = dynamic(() => import('../components/pages/sign-up/choice-cards'));
const Progress = dynamic(() => import('../components/pages/sign-up/progress/progress'));
const CustomerCase = dynamic(() =>
  import('../components/pages/sign-up/cases/customer-case/customer-case')
);
const MasterCase = dynamic(() =>
  import('../components/pages/sign-up/cases/master-case/master-case')
);

const SignUp = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [state, actions] = useProgress();

  const stepsCount = isCustomer ? 5 : 6;

  return (
    <Layout>
      <main className="content">
        <div className="sign-up">
          <h1 className="logo">Beaurel</h1>

          <Progress count={stepsCount} state={state} {...actions} />

          {state.current === 1 && <ChoiceCards state={[isCustomer, setIsCustomer]} {...actions} />}

          {isCustomer ? (
            <CustomerCase current={state.current} {...actions} />
          ) : (
            <MasterCase current={state.current} {...actions} />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
