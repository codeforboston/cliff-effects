import cloneDeep from 'lodash/cloneDeep';

import DE from './de';
import EN from './en';
import VI from './vi';
import ZH from './zh';

/** 
 * @returns {function}
 * 
 * @summary Exports a function which returns a deep clone of the language snippet objects.
 * 
 * @description 
 * interpolateSnippets() mutates it's localization object, whereas Localization Report in DevHud
 * compares the raw objects contained in localization files.  By providing a function which returns 
 * cloned data instead of a reference to the imported objects, the two can coexist.
*/
const getLocalizationData = () => {
  return cloneDeep({
    de: DE,
    en: EN,
    vi: VI,
    zh: ZH,
  });
};

export { getLocalizationData };
