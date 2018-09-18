/*
Usage:

const objToCheck = {
  a: { b: '1' },
  c: 2,
  d: [ 1, 2, 3, ],
  e: {
    f: {
      g: { h: '' },
      i: '',
    },
  },
};
const pathsArray = getKeyPathsArray(objToCheck);
console.log('pathsArray', pathsArray);

Console output:

[
  [ 'a' ],
  [ 'a', 'b' ],
  [ 'c' ],
  [ 'd' ],
  [ 'e' ],
  [ 'e', 'f' ],
  [ 'e', 'f', 'g' ],
  [ 'e', 'f', 'g', 'h' ],
  [ 'e', 'f', 'i' ]
]
*/

const getKeyPathsArray = function(obj, base = []) {
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

    // Otherwise, loop through the keys and recursively call compare()
    } else {
      for (let key of keys) {
        // Append this key to the base path array
        let newBase = [ 
          ...base,
          ...[ key ],
        ];
        pathsArr.push(newBase);

        // Pass this object back to our function to get paths to any children
        let childPaths = getKeyPathsArray(obj[ key ], newBase);
        
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

export { getKeyPathsArray };
