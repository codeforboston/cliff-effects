/** Returns a translator based on the language given */
import { merge } from 'lodash';

// DATA
import { localizations } from '../localization/all';
const english = localizations.en;  // unforunately, we need a default language

/** Returns the object named by langName that contains
 * the text snippets of that language. If that language
 * doesn't exist, it warns the coder and returns English.
 */
const getTextForLanguage = function (langName) {

  if (localizations[ langName ]) {

    // deeply merge the object containing snippets in langName with English,
    // so that we fall back to English if a particular field is missing.
    return merge({}, english, localizations[ langName ]);

  } else {

    console.warn('There\'s no localization for ' + langName + '. Defaulting to English.');
    return english;

  }

};  // End getTextForLanguage()


export { getTextForLanguage };
