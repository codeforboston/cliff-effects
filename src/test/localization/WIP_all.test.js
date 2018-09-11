import _ from 'lodash';
import { localizations } from '../../localization/all';

/*
Example:

const pathsArray = getKeyPathsArray(
  {
    a: { b: '1' },
    c: 2,
    d: [ 1, 2, 3, ],
    e: {
      f: {
        g: { h: '' },
        i: '',
      },
    },
  }
);

console.log('pathsArray', pathsArray);
=> [
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


// Get the list of non-EN localizations to test
let localizationKeys = Object.keys(localizations);
const enIndex = localizationKeys.indexOf('en');

// Only run our comparisons if EN localization exists
if (enIndex !== -1) {

  const keyPaths = {};
  for (let key of localizationKeys) {
    // Get the key paths from the localization files
    keyPaths[ key ] = getKeyPathsArray(localizations[ key ]);
  }

  // Remove EN from our keys to loop over
  localizationKeys.splice(enIndex, 1);
  
  // Loop through all non-en localizations
  for (let i = 0; i < localizationKeys.length; i++) {
    let locKey = localizationKeys[ i ];
   
    describe(`localization ${locKey}`, () => {
    
      // Test for keys in 'EN' that aren't localization being tested
      for (let j = 0; j < keyPaths[ 'en' ].length; j++) {
        let keyPath = keyPaths[ 'en' ][ j ];
        let keyPathAsStr = keyPath.join('.');
        let keyExistsInLoc = _.has(localizations[ locKey ], keyPath);

        it(`'en' path ${keyPathAsStr} exists in '${locKey}'`, () => {
          expect(keyExistsInLoc).toBe(true);
        });

        if (keyExistsInLoc) {
          // Get the value of our key so we can test its type
          let locVal = _.get(localizations[ locKey ], keyPath);
          
          // We'll only compare the values of strings and arrays.
          // Use a simple deep compare since arrays eventually 
          // become strings and we want to know if the text elements
          // of the array have been translated
          if (typeof locVal !== 'object' || Array.isArray(locVal)) {
            it(`${keyPathAsStr} translation should not be the same as '${locKey}'`, () => {
              expect(_.isEqual(locVal, _.get(localizations[ 'en' ], keyPath))).not.toBe(true);
            });
          }
        }
      }

      // Test for extra keys in localization being tested that aren't present in 'EN'
      for (let k = 0; k < keyPaths[ locKey ].length; k++) {
        let keyPath = keyPaths[ 'en' ][ k ];
        
        it(`'${locKey}' path ${keyPath.join('.')} exists in 'en'`, () => {
          expect(_.has(localizations[ 'en' ], keyPath)).toBe(true);
        });
      }

    });
  } // End non-en localizations loop

}
