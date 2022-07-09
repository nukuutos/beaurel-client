import Select from '../../../../base/form/select';
import PossibleServiceDurations from '../../shared/possible-service-durations';
import SessionTimeOptions from '../../shared/session-time-options';

const SessionTime = ({ values, goNext }) => (
  <>
    <h2 className="sign-up__heading sign-up__heading--center">
      Выберите базовую длительность ваших услуг
    </h2>

    <PossibleServiceDurations
      values={values}
      className="create-timetable__possible-service-durations"
    />

    <div className="sign-up__group mt-6">
      <label className="label" htmlFor="password">
        Базовая длительность
      </label>

      <div className="create-timetable__group">
        <Select
          className="create-timetable__session-time select"
          name="sessionTime"
          id="sessionTime"
          as="select"
        >
          <SessionTimeOptions />
        </Select>
        <span className="timetable-card__value ml-2">мин</span>
      </div>

      <button onClick={goNext} type="button" className="btn btn--primary sign-up__btn mt-6">
        Продолжить
      </button>
    </div>
  </>
);

export default SessionTime;
