const FormButtons = ({ openModal, editState, dirty, resetForm }) => {
  const { isEditing } = editState;

  const disabledClassName = !isEditing && dirty ? '' : 'btn--disabled';

  return (
    <div className="timetable__buttons mt-8">
      {dirty && (
        <div onClick={resetForm} className={`btn btn--secondary ${disabledClassName}  `}>
          Сбросить изменения
        </div>
      )}
      <div onClick={openModal} className={`btn btn--primary ${disabledClassName}`}>
        Сохранить
      </div>
    </div>
  );
};

export default FormButtons;
