/* If `bool` is `true`, return the given component,
 *     otherwise returns `null`.
 *
 * @param {boolean} bool If `true`, do what is desired.
 * @param {object} toDo Component to return if
 *     condition is met.
 */
const doIfTrue = function (bool, toDo) {

  if (bool === true) {
    return toDo;
  } else {
    return null;
  }

};  // End doIfTrue()


export { doIfTrue };
