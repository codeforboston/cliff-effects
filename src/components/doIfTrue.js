/* If `bool` is `true`, run and return the given
 *     function or return the give component.
 *
 * @param {boolean} bool If `true`, do what is desired.
 * @param {object} toDo Function or Component to run or
 *     return if conditions are met.
 */
const doIfTrue = function (bool, toDo) {

  if (bool === true) {

    if (typeof toDo === `function`) {
      return toDo();
    } else {  // If it's a Component
      return toDo;
    }

  } else {
    return null;
  }

};  // End doIfTrue()


export { doIfTrue };
