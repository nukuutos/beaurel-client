import Input from '../../base/form/input';
import useHandleMultipleInputChange from '../hooks/use-handle-multiple-input-change';
import useResendCode from '../hooks/use-resend-code';
import useTimer from '../hooks/use-timer';
import ResendCode from '../shared/resend-code';

const VerificationCode = ({ goToNextStep, errors, values, handleChange }) => {
  const [handleInputChange, handleKeyPress] = useHandleMultipleInputChange({ handleChange });
  const [timer, resetTimer] = useTimer();
  const resendCode = useResendCode(values.phone, '/auth/password/code');

  const handleResendCode = () => {
    resendCode();
    resetTimer();
  };

  const getDisabledClassName = (errors) => {
    const { first, seconde, third, fourth } = errors.code || {};

    if (first || seconde || third || fourth) {
      return 'btn--disabled';
    }

    return '';
  };

  const handleButtonClick = () => {
    const { first, seconde, third, fourth } = errors.code || {};

    if (first || seconde || third || fourth) return;

    goToNextStep();
  };

  return (
    <>
      <span className="sign-up__sub-heading mt-9">Введите код подтверждения</span>

      <div className="sign-up__verification">
        <Input
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="input sign-up__input--verification mr-7"
          name="code.first"
          id="first"
          type="text"
          maxLength="1"
        />
        <Input
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          className="input sign-up__input--verification mr-7"
          name="code.second"
          id="second"
          type="text"
          maxLength="1"
        />
        <Input
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="input sign-up__input--verification mr-7"
          name="code.third"
          id="third"
          type="text"
          maxLength="1"
        />
        <Input
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="input sign-up__input--verification"
          name="code.fourth"
          id="fourth"
          type="text"
          maxLength="1"
        />
      </div>

      <button
        onClick={handleButtonClick}
        type="button"
        className={`btn btn--primary ${getDisabledClassName(errors)} sign-up__btn`}
      >
        Подтвердить
      </button>

      <ResendCode timer={timer} resendCode={handleResendCode} />
    </>
  );
};

export default VerificationCode;
