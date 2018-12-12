import cloneDeep from 'lodash/cloneDeep';

import { de } from './de';
import { en } from './en';
import { vi } from './vi';
import { zh } from './zh';

/** 
 * @returns {function}
 * 
 * @summary Exports a function which returns a deep clone of the language translation objects.
 * 
 * @description 
 * interpolateTranslations() mutates its localization object, whereas Localization Report in DevHud
 * compares the raw objects contained in localization files.  By providing a function which returns 
 * cloned data instead of a reference to the imported objects, the two can coexist.
*/
const getLocalizationData = () => {
  return cloneDeep({
    de: de,
    en: en,
    vi: vi,
    zh: zh,
  });
};

export { getLocalizationData };
