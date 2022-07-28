import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Layout from '../components/layout/layout';
// import ChoiceCards from '../components/pages/sign-up/choice-cards';
// import CustomerCase from '../components/pages/sign-up/cases/customer-case/customer-case';
// import MasterCase from '../components/pages/sign-up/cases/master-case/master-case';
// import Progress from '../components/pages/sign-up/progress/progress';

import useProgress from '../components/pages/sign-up/use-progress';

// const Layout = dynamic(() => import('../components/layout/layout'));
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
  const [state, setState, actions] = useProgress();

  const { goToNextStep, resetProgress, disableProgressBar } = actions;

  const stepsCount = isCustomer ? 5 : 6;

  return (
    <Layout>
      <main className="content">
        <div className="sign-up">
          <h1 className="logo">Beaurel</h1>

          <Progress
            keyName={isCustomer ? 'customer' : 'master'}
            count={stepsCount}
            state={[state, setState]}
          />

          {state.current === 1 && (
            <ChoiceCards
              resetProgress={resetProgress}
              goNext={goToNextStep}
              state={[isCustomer, setIsCustomer]}
            />
          )}

          {isCustomer ? (
            <CustomerCase
              goNext={goToNextStep}
              current={state.current}
              disableProgressBar={disableProgressBar}
            />
          ) : (
            <MasterCase
              goNext={goToNextStep}
              current={state.current}
              disableProgressBar={disableProgressBar}
            />
          )}
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
