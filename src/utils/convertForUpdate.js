const convertForUpdate = function ({ name, route, ...otherProps }) {

  var forUpdate = {
    ...otherProps,
    route: route || name,
  };

  return forUpdate;

};  // End convertForUpdate()


export { convertForUpdate };
