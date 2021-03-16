import Layout from '../components/layout/layout';
import refreshToken from '../utils/refresh-token-auth';
import { wrapper } from '../redux/store';
import { END } from 'redux-saga';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Appointments = () => {
  return (
    <Layout>
      <main className="content card card--layout">
        <h1 className="appointments__controller appointment-controller card mt-8">
          <span className="appointment-controller__item appointment-controller__item--active">Записи к Вам</span>
          <span>|</span>
          <span className="appointment-controller__item appointment-controller__item">Ваши Записи</span>
        </h1>
        <h2 className="appointments__appointment-types appointment-types card mt-8">
          <span className="appointment-types__type appointment-types__type--waiting">ожидают</span>
          <span className="appointment-types__type appointment-types__type--confirmed">подтверждены</span>
          <span className="appointment-types__type appointment-types__type--unsuitable">неподходящие</span>
          <span className="appointment-types__type appointment-types__type--history">история</span>
        </h2>

        <div className="appointments__appointment-card appointment-card card mt-8">
          <div className="appointment-card__avatar mb-2" />
          <span className="appointment-card__name mt-2">Никита В.</span>
          <div className="appointment-card__header-line" />

          <span className="appointment-card__service mt-3">Приходи на ногти, пожалуйста, очень наd</span>

          <div className="appointment-card__date appointment-card__attribute mt-2">
            <FontAwesomeIcon icon={['far', 'calendar']} />
            28.12.21
          </div>
          <div className="appointment-card__time appointment-card__attribute mt-4">
            <FontAwesomeIcon icon="clock" />
            23:00
          </div>
          <div className="appointment-card__price appointment-card__attribute mt-4">
            <FontAwesomeIcon icon="ruble-sign" />
            300
          </div>
          <div className="appointment-card__buttons">
            <div className="btn btn--success btn--flat mr-2">Подтвердить</div>
            <div className="btn btn--flat btn--fail">Отклонить</div>
          </div>
        </div>

        <div className="appointments__noappointments card mt-8">Записи отсутствуют</div>
      </main>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, req, res, query }) => {
  const { id } = query;

  await refreshToken(req, res, store); // dispatch this?

  return { props: { custom: 'custom' } };
});

export default Appointments;
