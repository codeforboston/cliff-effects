/* If `bool` is `true`, return the given component,
 *     otherwise returns `null`.
 *
 * @param {boolean} bool If `true`, do what is desired.
 * @param {object} ToRender Component to return if
 *     condition is met.
 * 
 * @deprecated
 */
const renderIfTrue = function (bool, ToRender) {

  if (bool === true) {
    return ToRender;
  } else {
    return null;
  }

};  // End renderIfTrue()


export { renderIfTrue };
