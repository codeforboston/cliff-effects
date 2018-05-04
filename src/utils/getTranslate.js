/** Returns a translator based on the language given */
import { localizations } from '../localization/all';

const getTranslate = function ( appLanguage ) {

  /**
   * Returns the text in the default language unless
   * an overriding language is handed in, in which
   * case, that's used.
   */
  const translate = function ( textKey, languageOverride ) {

    var language    = languageOverride || appLanguage,
        translation = localizations[ language ][ textKey ];

    return translation;

  };

  return translate;

};


export {
  getTranslate,
};
