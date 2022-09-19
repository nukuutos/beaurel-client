import dynamic from 'next/dynamic';

import Layout from '../components/layout/layout';
import useProgress from '../components/pages/sign-up/use-progress';
import useSignUpState from '../components/pages/sign-up/use-sign-up-state';

const ChoiceCards = dynamic(() => import('../components/pages/sign-up/choice-cards'));
const Progress = dynamic(() => import('../components/pages/sign-up/progress/progress'));
const CustomerCase = dynamic(() =>
  import('../components/pages/sign-up/cases/customer-case/customer-case')
);
const MasterCase = dynamic(() =>
  import('../components/pages/sign-up/cases/master-case/master-case')
);

const SignUp = () => {
  const [progressState, progressActions] = useProgress();
  const [state, actions] = useSignUpState(progressActions);
  const { steps, user } = state;

  return (
    <Layout>
      <main className="content">
        <div className="sign-up">
          <h1 className="logo">Beaurel</h1>

          <Progress count={steps} state={progressState} {...progressActions} />

          {progressState.current === 1 && (
            <ChoiceCards state={state} {...actions} {...progressActions} />
          )}

          {user === 'customer' && (
            <CustomerCase current={progressState.current} {...progressActions} />
          )}

          {user === 'master' && <MasterCase current={progressState.current} {...progressActions} />}
        </div>
      </main>
    </Layout>
  );
};

export default SignUp;
