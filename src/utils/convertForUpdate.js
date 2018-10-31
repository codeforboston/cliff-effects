/**
 *
 */
const convertForUpdate = function ({ name, route, ...otherProps }) {

  let forUpdate = {
    ...otherProps,
    route: route || name,
  };

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
