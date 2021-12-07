import * as Yup from 'yup';

export const aboutField = Yup.string().trim().max(150, 'Максимальная длина - 150 символов');

const aboutTextSchema = Yup.object().shape({
  aboutText: aboutField,
});

export default aboutTextSchema;
