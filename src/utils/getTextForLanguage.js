/** Returns a translator based on the language given */
import { mergeWith } from 'lodash';

// DATA
import { localizations } from '../localization/all';
const english = localizations.en;  // unforunately, we need a default language

/** Customizes Lodash's mergeWith function to replace arrays completely
 * (to avoid arrays of English strings being mixed with arrays of translated
 * strings, if they happen to have different lengths).
 */
const mergeCustomizer = function (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
};

/** Returns the object named by langName that contains
 * the text snippets of that language. If that language
 * doesn't exist, it warns the coder and returns English.
 */
const getTextForLanguage = function (langName) {

  if (localizations[ langName ]) {

    // deeply merge the object containing snippets in langName with English,
    // so that we fall back to English if a particular field is missing.
    return mergeWith({}, english, localizations[ langName ], mergeCustomizer);

  } else {

    console.warn('There\'s no localization for ' + langName + '. Defaulting to English.');
    return english;

  }

};  // End getTextForLanguage()


export { getTextForLanguage };
