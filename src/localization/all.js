/** Contains and exports all the languages */

import { interpolateSnippets } from '../utils/interpolation';
import inlineComponents from './inlineComponents';

import DE from './de';
import EN from './en';
import ZH from './zh';

var localizations = {
  de: DE,
  en: EN,
  zh: ZH,
};

// Interpolate inline Components
for (const lang in localizations) {
  var snippets = localizations[ lang ];
  localizations[ lang ] = interpolateSnippets(snippets, inlineComponents);
}

export { localizations };
