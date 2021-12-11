import { ErrorMessage, Form } from 'formik';
import { useSelector } from 'react-redux';
import Input from '../../../../../base/form/input';

const MasterWorkForm = ({ onBackButtonClick, onSubmit = null }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Form className="add-master-work__form ">
      <label htmlFor="title" className="label mt-2">
        Название
      </label>
      <Input className="input add-master-work__input" type="text" name="title" id="title" />
      <ErrorMessage name="title">
        {(msg) => <div className="add-master-work__error error mt-1">{msg}</div>}
      </ErrorMessage>

      <div className="add-master-work__buttons mt-6">
        {!isPhone && (
          <button type="button" onClick={onBackButtonClick} className={`btn btn--secondary mr-4 `}>
            Назад
          </button>
        )}
        <button onClick={onSubmit} type="submit" className={`btn btn--primary `}>
          Добавить
        </button>
      </div>
    </Form>
  );
};
export default MasterWorkForm;
