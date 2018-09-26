// MANIPULATION
import { toBoolean } from '../utils/valueFixers';

/**
 *
 */
const convertForUpdate = function ({ name, route, value, checked, ...otherProps }) {

  var forUpdate = {
    ...otherProps,
    value: value,
    route: route || name,
  };

  if (checked) {
    forUpdate.value = toBoolean(value);
  }

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
