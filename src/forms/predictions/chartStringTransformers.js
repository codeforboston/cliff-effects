/** Functions to help transform strings for charts.
 * @module */


/** Mutator. Set the thousands separator character for a Highcharts`
 *     options.
 *
 * @params {object} translations The strings for the app's current
 *     language.
 * @params {object} Highcharts Where to set the options.
 *
 * @returns {nothing}
 */
const setThousandsSeparator = function (translations, Highcharts) {
  // We really need our own number formatting functions
  let separator = textFromTranslatedElement(translations.i_thousandsSeparator);
  // This is for Highcharts to format pure numbers
  Highcharts.setOptions({ lang: { thousandsSep: separator }});
};


/** Get the string that will format the 'bottom tooltips',
 *     which are really the label headers but don't look that
 *     way visually on the chart.
 *
 * @params {object} translations The strings for the app's current
 *     language.
 *
 * @returns {string}
 */
const getBottomTooltipFormat = function (translations) {
  let getText             = textFromTranslatedElement,
      start               = `<span class="tooltip-label-header">${getText(translations.i_beforeMoney)}`,
      end                 = `{point.key:,.2f}${getText(translations.i_afterMoney)}</span><br/>`,
      bottomTooltipFormat = start + end;
  return bottomTooltipFormat;
};


/** Adds translation-specific money designations
 *     (like a dollar sign for English) to the number value
 *     string Highcharts creates, then wraps it in a span with
 *     a class.
 *
 * @params {object} chartObject Object Highcharts sends to event
 *     handlers
 *
 * @returns {string} String representing an HTML element.
 * 
 * @example
 * let toShow = formatMoneyWithk({ axis: { defaultLabelFormatter: function () { return '10k'; }} });
 * console.log(toShow);
 * // If app's language code is 'en':
 * // <span class="graph-label">$10k</span>
 * // If app's language code is 'vi':
 * // <span class="graph-label">10k$</span>
 */
const formatMoneyWithK = (chartObject, translations) => {
  const before    = textFromTranslatedElement(translations.i_beforeMoney),
        after     = textFromTranslatedElement(translations.i_afterMoney),
        // https://api.highcharts.com/highcharts/xAxis.labels.formatter
        withMoney = before + chartObject.axis.defaultLabelFormatter.call(chartObject) + after,
        asHTML    = `<span class="graph-label">${withMoney}</span>`;
  return asHTML;
};


/** Recursively extract text from language-specific React
 *     objects. Creates one inline string of text.
 * Recursion is untested.
 *
 * @params {object} translationObj React element containing
 *     children that are strings or other React elements.
 *
 * @returns {string}
 */
const textFromTranslatedElement = function (translationObj) {

  const children = translationObj.props.children;
  
  if (typeof children === `string`) {
    return children;

  // To handle more complex translationObj objects
  } else if (Array.isArray(children)) {

    let allText = ``;
    for (let child of children) {
      allText += ` ` + textFromTranslatedElement(child);
    }

    return allText;
  }
};


export {
  setThousandsSeparator,
  getBottomTooltipFormat,
  formatMoneyWithK,
  textFromTranslatedElement,
};
