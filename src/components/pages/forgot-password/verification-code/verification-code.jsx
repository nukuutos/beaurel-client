import Input from '../../../base/form/input';
import displayDuration from './display-duration';
import useHandleChange from './use-handle-change';
import useTimer from './use-timer';

const VerificationCode = ({ goNext, errors, values, handleChange }) => {
  const handleInputChange = useHandleChange({ handleChange });
  const [timer, resendCode] = useTimer(values.phone);

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

    goNext();
  };

  return (
    <>
      <span className="sign-up__sub-heading mt-9">Введите код подтверждения</span>

      <div className="sign-up__verification">
        <Input
          onChange={handleInputChange}
          className="input sign-up__input--verification mr-7"
          name="code.first"
          id="first"
          type="text"
          maxLength="1"
        />
        <Input
          onChange={handleInputChange}
          className="input sign-up__input--verification mr-7"
          name="code.second"
          id="second"
          type="text"
          maxLength="1"
        />
        <Input
          onChange={handleInputChange}
          className="input sign-up__input--verification mr-7"
          name="code.third"
          id="third"
          type="text"
          maxLength="1"
        />
        <Input
          onChange={handleInputChange}
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

      {timer ? (
        <span className="sign-up__repeat mt-3">
          Повторно получить код можно через
          <span className="sign-up__time"> {displayDuration(timer)}</span>
        </span>
      ) : (
        <span className="sign-up__repeat mt-3">
          Не получили код?{' '}
          <span onClick={resendCode} className="btn-text">
            отправить повторно
          </span>
        </span>
      )}
    </>
  );
};

export default VerificationCode;
