/**
 *
 */
const convertForUpdate = function ({ name, route, value, checked, ...otherProps }) {

  var val = value;
  if (typeof checked === `boolean`) {
    val = checked;
  }

  var forUpdate = {
    ...otherProps,
    route: route || name,
    value: val,
  };

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
