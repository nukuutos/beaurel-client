import City from '../master-case/city';

const CityCustomer = ({ goNext }) => (
  <>
    <h2 className="sign-up__heading">Выберите Ваш город</h2>
    <div className="sign-up__group">
      <City />
      <button onClick={goNext} type="button" className="btn btn--primary sign-up__btn mt-6">
        Продолжить
      </button>
    </div>
  </>
);

export default CityCustomer;
