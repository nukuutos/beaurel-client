const Switch = ({ state }) => {
  const [serviceType, setServiceType] = state;

  const getClassName = (value) => {
    let className = 'switch__label ';
    if (serviceType === value) className += 'switch__label--active';
    return className;
  };

  return (
    <div className="switch">
      <div
        className={getClassName('service')}
        htmlFor="service"
        onClick={() => setServiceType('service')}
      >
        Нет
      </div>
      <div
        className={getClassName('parameter')}
        htmlFor="service-parameter"
        onClick={() => setServiceType('parameter')}
      >
        Да
      </div>
    </div>
  );
};

export default Switch;
