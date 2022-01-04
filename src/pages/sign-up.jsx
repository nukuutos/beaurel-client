import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/layout/layout';

import ChoiceCards from '../components/pages/sign-up/choice-cards';
import CustomerCase from '../components/pages/sign-up/cases/customer-case';
import MasterCase from '../components/pages/sign-up/cases/master-case';
import Progress from '../components/pages/sign-up/progress/progress';
import useProgress from '../components/pages/sign-up/use-progress';

const SignIn = () => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const [isCustomer, setIsCustomer] = useState(true);
  const [state, setState, actions] = useProgress();

  const { goToNextStep, resetProgress, disableProgressBar } = actions;

  const stepsCount = isCustomer ? 4 : 5;

  return (
    <Layout>
      <main className={`content ${isPhone ? '' : 'card card--layout'}`}>
        <div className="sign-up">
          <h1 className="logo">Beautify</h1>

          <Progress count={stepsCount} state={[state, setState]} />

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

export default SignIn;
