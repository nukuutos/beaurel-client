import * as Yup from 'yup';

const startAtField = Yup.number().required('Необходимо для заполнения!');

const endAtField = Yup.number()
  .required('Необходимо для заполнения!')
  .test('Рабочий день', 'Неверное начало рабочего дня!', function (value) {
    return this.parent.startAt < value;
  });

const schema = Yup.object().shape({
  auto: Yup.object().shape({
    workingDay: Yup.object().shape({ startAt: startAtField, endAt: endAtField }),
  }),
});

export default schema;
