import { isEmpty, isEqual, xorWith } from 'lodash';

const areOrdersEqual = (a, b) => isEmpty(xorWith(a, b, isEqual));

export default areOrdersEqual;
