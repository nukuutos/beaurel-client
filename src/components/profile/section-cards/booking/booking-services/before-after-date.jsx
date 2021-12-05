import getServicesUpdateDate from './get-services-update-date';

const BeforeAfterDate = ({ services, switcherState }) => {
  const [servicesSwitcher, setServicesSwitcher] = switcherState;

  const servicesUpdateDate = getServicesUpdateDate(services);

  return (
    <div className="services__switch switch mt-6">
      <button
        type="button"
        className={`switch__label ${servicesSwitcher === 'before' ? 'switch__label--active' : ''}`}
        onClick={() => setServicesSwitcher('before')}
      >
        по {servicesUpdateDate.subtract(1, 'day').format('DD.MM.YY')}
      </button>
      <button
        type="button"
        className={`switch__label ${servicesSwitcher === 'after' ? 'switch__label--active' : ''}`}
        onClick={() => setServicesSwitcher('after')}
      >
        c {servicesUpdateDate.format('DD.MM.YY')}
      </button>
    </div>
  );
};

export default BeforeAfterDate;
