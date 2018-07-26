/** Returns a translator based on the language given */

// TRANSFORMER FUNCTIONS
import { mergeWith } from 'lodash';
import { interpolateSnippets } from './interpolation.js';

// DATA
import { localizations } from '../localization/all';
import inlineComponents from '../localization/inlineComponents';
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

  let snippetsTemplate;
  if (localizations[ langName ]) {

    // deeply merge the object containing snippets in langName with English,
    // so that we fall back to English if a particular field is missing.
    snippetsTemplate = mergeWith({}, english, localizations[ langName ], mergeCustomizer);

  } else {

    console.warn('There\'s no localization for ' + langName + '. Defaulting to English.');
    snippetsTemplate = english;

  }

  return interpolateSnippets(snippetsTemplate, inlineComponents);

};  // End getTextForLanguage()


export { getTextForLanguage };
