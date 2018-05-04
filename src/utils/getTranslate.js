/** Returns a translator based on the language given */
import { get } from 'lodash';

// DATA
import { localizations } from '../localization/all';
var english = localizations.en;  // unforunately, we need a default language

const getTranslate = function (appLanguageName) {

  var appLanguage = localizations[ appLanguageName ];  // Language for the app
  if (appLanguage === undefined) {
    throw new ReferenceError('There\'s no localization for ' + appLanguageName);
  }

  /**
   * Returns the text in the default language unless
   * an overriding language is given, in which case
   * that's used.
   */
  const translate = function (textKeys, languageOverrideName) {

    console.log(1, appLanguage);

    var thisLang    = appLanguage,
        translation = null,
        override    = null,
        langName    = null,
        message     = null;

    // Special language for just this time
    if (languageOverrideName) {

      override = localizations[ languageOverrideName ];
      if (override) {
        thisLang = override;
      } else {
        console.warn('There\'s no localization for ' + languageOverrideName);
      }

    }

    // The desired translation
    translation = get(thisLang, textKeys);

    // Fallback to English with warning
    if (translation === undefined) {

      langName = thisLang.langName;
      message  = 'There\'s no snippet at ' + textKeys + ' in ' + langName;
      console.warn(message);

      translation = get(english, textKeys);

    }

    if (translation === undefined) {
      // Nothing worked, invalid object path
      // If the language wasn't English, make it clear that it
      // didn't exist in English either
      if (langName !== 'English') {
        message += 'or English';
      }

      throw new ReferenceError(message);
    }

    return translation;

  };  // End translate()

  return translate;

};  // End getTranslate()


export { getTranslate };
