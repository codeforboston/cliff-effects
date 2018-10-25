/**
 *
 */
const convertForUpdate = function ({ name, route, ...otherProps }) {

  const forUpdate = {
    ...otherProps,
    route: route || name,
  };

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
