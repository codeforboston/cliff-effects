/**
 * Returns a version of the passed in object that is recursively frozen.
 * 
 * Does not freeze the passed object or any of its nested properties, instead
 * returns a frozen copy (diverges from the behavior of Object.freeze()).
 * 
 * @param {*} obj - The object to deep freeze
 * 
 * @returns the frozen object 
 */
const deepFreeze = (obj) => {
  if (typeof obj === 'undefined' || obj === null) {
    return obj;
  }

  // Object.freeze() freezes the object passed in as well as returning the frozen object,
  // so we need to shallow clone the object/array
  obj =
    Array.isArray(obj) ?
      obj.slice() :
      Object.assign({}, obj);

  for (let prop in obj) {
    if (
      !obj.hasOwnProperty(prop) ||
      Object.isFrozen(obj[ prop ])
    ) {
      continue;
    }

    if (typeof obj[ prop ] === 'object') {
      obj[ prop ] = deepFreeze(obj[ prop ]);
    }
  }

  return Object.freeze(obj);
};

export default deepFreeze;
