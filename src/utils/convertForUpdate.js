/**
 *
 */
const convertForUpdate = function ({ name, route, value, checked }) {

  var val = value;
  if (typeof checked === `boolean`) {
    val = checked;
  }

  var forUpdate = {
    route: route || name,
    value: val,
  };

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
