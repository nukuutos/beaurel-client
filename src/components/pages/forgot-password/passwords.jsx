import { ErrorMessage } from 'formik';
import Input from '../../base/form/input';

const Passwords = ({ errors }) => {
  const isDisabled = errors.newPassword || errors.newConfirmedPassword;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  return (
    <>
      <h2 className="sign-up__heading">Введите новый пароль</h2>

      <div className="sign-up__group">
        <div className="sign-up__group mt-7">
          <label className="label" htmlFor="newPassword">
            Пароль
          </label>
          <Input
            className="input sign-up__input"
            name="newPassword"
            id="newPassword"
            type="password"
          />
          <ErrorMessage name="newPassword">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        <div className="sign-up__group mt-4">
          <label className="label" htmlFor="newConfirmedPassword">
            Подтвердите пароль
          </label>
          <Input
            className="input sign-up__input"
            name="newConfirmedPassword"
            id="newConfirmedPassword"
            type="password"
          />
          <ErrorMessage name="newConfirmedPassword">
            {(msg) => <div className="error mt-1">{msg}</div>}
          </ErrorMessage>
        </div>

        <button
          // onClick={handleClick}
          type="submit"
          className={`btn btn--primary ${disabledClassName} sign-up__btn mt-6`}
        >
          Поменять пароль
        </button>
      </div>
    </>
  );
};

export default Passwords;
