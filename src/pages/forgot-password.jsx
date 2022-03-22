import Layout from '../components/layout/layout';
import useProgress from '../components/pages/sign-up/use-progress';
import useOnSubmit from '../components/pages/forgot-password/use-on-submit';
import PasswordChangesSuccess from '../components/pages/forgot-password/password-changed-success';
import ForgotPasswordForm from '../components/pages/forgot-password/forgot-password-form/forgot-password-form';

const ForgotPassword = () => {
  const [state, setState, actions] = useProgress();
  const { goToNextStep } = actions;
  const [handleSubmit, isLoading] = useOnSubmit(goToNextStep);

  return (
    <Layout>
      <main className="content">
        <div className="sign-up">
          <h1 className="logo">Beaurel</h1>
          {isLoading && <div className="spinner-with-background" />}
          {state.current < 4 && (
            <ForgotPasswordForm state={state} setState={setState} handleSubmit={handleSubmit} />
          )}

          {state.current === 4 && <PasswordChangesSuccess />}
        </div>
      </main>
    </Layout>
  );
};

export default ForgotPassword;
