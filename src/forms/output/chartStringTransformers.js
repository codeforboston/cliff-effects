/** Functions to help transform strings for charts.
 * @module */


/** Recursively extract text from language-specific React
 *     objects. Creates one inline string of text.
 *
 * Recursion is untested.
 * @params {object} translationObj React element containing
 *     children that are strings or other React elements.
 *
 * @returns {string}
 */
const snippetToText = function (translationObj) {

  const children = translationObj.props.children;
  
  if (typeof children === `string`) {
    return children;

  // To handle more complex translationObj objects
  } else if (Array.isArray(children)) {

    let allText = ``;
    for (let child of children) {
      allText += ` ` + snippetToText(child);
    }

    return allText;
  }
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
  const before    = snippetToText(translations.i_beforeMoney),
        after     = snippetToText(translations.i_afterMoney),
        // https://api.highcharts.com/highcharts/xAxis.labels.formatter
        withMoney = before + chartObject.axis.defaultLabelFormatter.call(chartObject) + after,
        asHTML    = `<span class="graph-label">${withMoney}</span>`;
  return asHTML;
};


export {
  formatMoneyWithK,
  snippetToText,
};
