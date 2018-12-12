// TRANSFORMER FUNCTIONS
import { mergeWith } from 'lodash';
import { interpolateTranslations } from './interpolation.js';

// DATA
import { getLocalizationData } from '../localization/all';
import inlineComponents from '../localization/inlineComponents';

// Get copy of localization data
const localizations = getLocalizationData();

// store interpolated and (if necessary) merged translations objects
let finishedTranslations = { en: interpolateTranslations(localizations.en, inlineComponents) };

/** Customizes Lodash's mergeWith function to replace arrays completely
 *     (to avoid arrays of English strings being mixed with arrays of translated
 *     strings, if they happen to have different lengths).
 */
const mergeCustomizer = function (objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue;
  }
};

/**
 * Returns the object named by langName that contains
 *     the text translations of that language. If that language
 *     doesn't exist, it warns the coder and returns English.
 */
const getTextForLanguage = function (langCode) {
  if (!localizations[ langCode ]) {
    console.warn(`There's no localization for ` + langCode + `. Defaulting to English.`);
    langCode = `en`;
  }

  if (!finishedTranslations[ langCode ]) {
    // interpolate translations and merge with English (filling in any gaps)
    const interpolatedTranslations = interpolateTranslations(localizations[ langCode ], inlineComponents);

    // deeply merge the object containing translations in langName with English,
    // so that we fall back to English if a particular field is missing.
    finishedTranslations[ langCode ] =  mergeWith({}, finishedTranslations.en, interpolatedTranslations, mergeCustomizer);
  }

  return finishedTranslations[ langCode ];
};


export {
  mergeCustomizer,
  getTextForLanguage,
};
