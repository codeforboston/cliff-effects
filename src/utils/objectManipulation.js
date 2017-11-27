/**
 * For setting and manipulating object
 *     values in general.
 */

// I can't figure out how to use lodash's
// `cloneDeep`, so I'm resorting to this.
const cloneDeep = function ( obj ) {
  return JSON.parse( JSON.stringify( obj ) );
};


export {
  cloneDeep
};
