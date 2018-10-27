/** Returns a translator based on the language given */

// TRANSFORMER FUNCTIONS
import { mergeWith } from 'lodash';
import { interpolateSnippets } from './interpolation.js';

// DATA
import { localizations } from '../localization/all';
import inlineComponents from '../localization/inlineComponents';

// store interpolated and (if necessary) merged snippets objects
const finishedSnippets = { en: interpolateSnippets(localizations.en, inlineComponents) };

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
const getTextForLanguage = function (langCode) {
  if (!localizations[ langCode ]) {
    console.warn('There\'s no localization for ' + langCode + '. Defaulting to English.');
    langCode = 'en';
  }

  if (!finishedSnippets[ langCode ]) {
    // interpolate snippets and merge with English (filling in any gaps)
    const interpolatedSnippets = interpolateSnippets(localizations[ langCode ], inlineComponents);

    // deeply merge the object containing snippets in langName with English,
    // so that we fall back to English if a particular field is missing.
    finishedSnippets[ langCode ] =  mergeWith({}, finishedSnippets.en, interpolatedSnippets, mergeCustomizer);
  }

  return finishedSnippets[ langCode ];
};  // End getTextForLanguage()


export { getTextForLanguage };
