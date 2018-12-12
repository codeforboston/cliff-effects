const convertForUpdate = function ({ name, route, ...otherProps }) {

  let forUpdate = {
    ...otherProps,
    route: route || name,
  };

  return forUpdate;

};


export { convertForUpdate };
