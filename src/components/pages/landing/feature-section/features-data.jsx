import Envelope from '../../../base/icons/envelope';
import Images from '../../../base/icons/images';
import List from '../../../base/icons/list';
import Lock from '../../../base/icons/lock';
import Question from '../../../base/icons/question';
import Search from '../../../base/icons/search';
import Star from '../../../base/icons/star';
import System from '../../../base/icons/system';

export const featuresDataMaster = [
  {
    title: 'Автоматизация',
    description: 'Создавайте и настраивайте расписание и услуги - остальное за нами',
    icon: <System className="feature-box__icon" />,
  },
  {
    title: 'Защита отзывов',
    description: 'Оставить отзыв может только пользователь, побывавший у Вас на приёме',
    icon: <Lock className="feature-box__icon" />,
  },
  {
    title: 'Мессенджер',
    description: 'Возможность обмена сообщений с клиентом по-любому вопросу',
    icon: <Envelope className="feature-box__icon" />,
  },
  {
    title: 'Витрина работ',
    description: 'Добавляйте и показывайте свои работы любому, кто побывает на Вашей странице',
    icon: <Images className="feature-box__icon" />,
  },
];

export const featuresDataCustomer = [
  {
    title: 'Поиск мастеров',
    description: 'Ищите и выбирайте подходящих мастеров внутри Вашего города',
    icon: <Search className="feature-box__icon" />,
  },
  {
    title: 'Оставляйте отзывы',
    description: 'Оцениваете проделанную работу мастером после посещения приёма',
    icon: <Star className="feature-box__icon" />,
  },
  {
    title: 'Будьте на связи',
    description: 'Обменивайтесь сообщениями с мастером по-любому вопросу',
    icon: <Envelope className="feature-box__icon" />,
  },
  {
    title: 'Скоро...',
    icon: <Question className="feature-box__icon--disabled" />,
  },
];
