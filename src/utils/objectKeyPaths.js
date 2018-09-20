/**
 * Recursive function that returns an object's keys as an array of arrays.  Can be 
 * used with lodash's Array methods such as _.get() and _.has().  Created to help 
 * find missing and/or extraneous keys in localization objects. 
 * @function
 * @name getKeyPathsArray
 * @param {object} obj - The object to be converted.
 * @param {boolean} stripVersions - Flag to indicate whether to remove localization version numbers from keys myKey_v1.0 becomes myKey.
 * @param {array} base - Array of keys to prepended.  Used for recursion, usually not passed in your call
 * @return {array} Array containing arrays of object keys as strings
 * 
 * @example
 * const objModel = {
 *   a: { b: '1' },
 *   c: 2,
 *   d: [ 1, 2, 3, ],
 *   e: {
 *     f: {
 *       g: { h: '' },
 *       i: '',
 *     },
 *   },
 * };
 * const pathsArray = getKeyPathsArray(objModel);
 * 
 * console.log(pathsArray);
 * // [
 * //   [ 'a' ],
 * //   [ 'a', 'b' ],
 * //   [ 'c' ],
 * //   [ 'd' ],
 * //   [ 'e' ],
 * //   [ 'e', 'f' ],
 * //   [ 'e', 'f', 'g' ],
 * //   [ 'e', 'f', 'g', 'h' ],
 * //   [ 'e', 'f', 'i' ]
 * // ]
 * 
 * const objToCompare = {
 *   a: { b: '1' },
 *   e: {
 *     f: {
 *       g: { h: '' },
 *     },
 *   },
 * };

 * console.log(_.has(objToCompare, pathsArray[2])); // false
 * console.log(_.has(objToCompare, pathsArray[8])); // true
 * console.log(_.get(objToCompare, pathsArray[0])); // { b: '1' }
 * console.log(_.get(objToCompare, pathsArray[1])); // 1
 * console.log(_.get(objToCompare, pathsArray[2])); // undefined
 */
const getKeyPathsArray = (obj, stripVersions, base = []) => {
  // Array to contain our keys paths (if any)
  let pathsArr = [];
  
  // Arrays in localization are interpolated into translated strings, so don't do anything
  if (Array.isArray(obj)) {
    return pathsArr;

  // Return an array of paths to each prop using the base path and the key in each loop iteration
  } else if (typeof obj === 'object') {
    const keys = Object.keys(obj).sort();
    
    // Handle having an empty object
    if (keys.length === 0) {
      return pathsArr;

    // Otherwise, loop through the keys and recursively call getKeyPathsArray()
    } else {
      for (let key of keys) {
        // Allow for removing version info from key myKey_v1.0 becomes just myKey in the returned structure.
        let cleanedKey = key;
        if (stripVersions) {
          cleanedKey = key.split('_')[ 0 ];
        }
        // Append this key to the base path array
        let newBase = [ 
          ...base,
          cleanedKey,
        ];
        pathsArr.push(newBase);

        // Pass this object back to our function to get paths to any children
        let childPaths = getKeyPathsArray(obj[ key ], stripVersions, newBase);
        
        // Add any child paths to our array before returning
        pathsArr = pathsArr.concat(childPaths);
      }
      return pathsArr;
    }

  // Otherwise, we've got some sort of primative such as a str, num, etc, so don't do anything
  } else {
    return pathsArr;
  }
};


/**
 * Convert key path array to an array of '.'-delimited strings.
 * @function
 * @name getKeyPathStrings
 * @param {object} keyPathsArr - Key paths array returned by getKeyPathsArray() 
 * @return {array} New array of key strings
 * 
 * @example
 * const keyPathsArray = [
 *   [ 'a' ],
 *   [ 'a', 'b' ],
 *   [ 'e' ],
 *   [ 'e', 'f' ],
 *   [ 'e', 'f', 'g' ],
 *   [ 'e', 'f', 'g', 'h' ],
 * ];
 * 
 * const keyPathsAsStrings = getKeyPathStrings(keyPathsArray);
 * console.log(keyPathsAsStrings);
 * // [ 
 * //   'a',
 * //   'a.b',
 * //   'e',
 * //   'e.f',
 * //   'e.f.g',
 * //   'e.f.g.h'
 * // ]
 */
const getKeyPathStrings = (keyPathsArr) => {
  return keyPathsArr.map((keyPath) => { 
    return keyPath.join('.');
  });
};


export { getKeyPathsArray, getKeyPathStrings };
