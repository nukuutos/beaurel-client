import 'regenerator-runtime/runtime';
import dynamic from 'next/dynamic';

import useProgress from '../components/pages/sign-up/use-progress';
import useOnSubmit from '../components/pages/forgot-password/use-on-submit';

import Layout from '../components/layout/layout';

const PasswordChangesSuccess = dynamic(() =>
  import('../components/pages/forgot-password/password-changed-success')
);

const ForgotPasswordForm = dynamic(() =>
  import('../components/pages/forgot-password/forgot-password-form/forgot-password-form')
);

const ForgotPassword = () => {
  const [state, actions] = useProgress();

  const { goToNextStep } = actions;

  const [handleSubmit, isLoading] = useOnSubmit(goToNextStep);

  return (
    <Layout>
      <main className="content">
        <div className="sign-up">
          <h1 className="logo">Beaurel</h1>
          {isLoading && <div className="spinner-with-background" />}
          {state.current < 4 && (
            <ForgotPasswordForm state={state} handleSubmit={handleSubmit} {...actions} />
          )}

          {state.current === 4 && <PasswordChangesSuccess />}
        </div>
      </main>
    </Layout>
  );
};

export default ForgotPassword;
