import xorWith from 'lodash.xorwith';
import isEmpty from 'lodash.isempty';
import isEqual from 'lodash.isequal';

const areOrdersEqual = (a, b) => isEmpty(xorWith(a, b, isEqual));

export default areOrdersEqual;
