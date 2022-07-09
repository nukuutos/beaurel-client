import { Form, Formik } from 'formik';
import specializations from '../../../config/specializations';
import Input from '../../base/form/input';
import Select from '../../base/form/select';
import Search from '../../base/icons/search';

const SearchForm = ({ form, handleSubmit, cancelSubmit }) => {
  const handleFormChange = (e) => {
    if (cancelSubmit) cancelSubmit();
    form.current.handleChange(e);
    form.current.submitForm();
  };

  return (
    <Formik
      innerRef={form}
      enableReinitialize
      initialValues={{ search: '', specialization: '' }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="search__form">
          <div className="search__specialization mt-7">
            <label htmlFor="specialization" className="label label--primary">
              Специализация
            </label>
            <Select
              onChange={handleFormChange}
              id="specialization"
              className="input select"
              name="specialization"
              as="select"
              isIconOnValue={false}
            >
              <option value="" className="option">
                Все
              </option>
              {specializations.map((specialization) => (
                <option value={specialization} key={specialization} className="option">
                  {specialization}
                </option>
              ))}
            </Select>
          </div>

          <div className="search__name mt-7">
            <label htmlFor="name" className="label">
              Имя, id
            </label>
            <div className="input--icon">
              <Search className="input__icon" />
              <Input
                onChange={handleFormChange}
                id="name"
                type="text"
                className="input ml-1"
                name="search"
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default SearchForm;
