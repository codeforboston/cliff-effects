/** Handles the core of form values, including:
 * - Storing both a current and future value
 * - Tracking when the user manipulates a future value
 * - Propagating current values to future values if they
 * haven't been manipulated by the user
 * - Making this instance serializable
 * - Sending values to be validated
 * 
 * All values stored in a FormValue instance should be valid
 * 
 * There must be a better way to write that.
 * 
 * @class
 * @param {string} name - the name of the client property
 * @param {any} [val] - the initial value
 * @param {function} [validate] - transforms a given value into
 * a valid value. Will be given the new value, the current value,
 * the string 'current' or 'future', and the `FormValue` instance.
 * 
 * @returns FormValue
 * @todo Finish description of FormValue return value
 */
class FormValue {

  constructor ( name, val = null, validate ) {

    var fVal = this;
    
    fVal.name = name;
    fVal._futureWasChanged = false;  // Handled internally
    fVal.validate = validate || function () { return true; };
    
    fVal.setCurrent( val );

  }  // End FormValue.constructor()


  setCurrent ( val ) {

    var fVal = this;

    // Transformer would be less verbose, but open to devs' complications
    if ( fVal.validate( val, fVal.current, 'current', fVal ) ) {
      fVal.current = val;
    }

    if ( !fVal._futureWasChanged ) {
      fVal.setFuture( val, true );
    }

    return fVal;  // Return valid value instead?

  }  // End FormValue.setCurrent()


  setFuture ( val, fromCurrent ) {
    
    var fVal = this;

    this._futureWasChanged = !fromCurrent;
    if ( fVal.validate( val, fVal.future, 'future', fVal ) ) {
      fVal.future = val;
    }
    
    return fVal;  // Return valid value instead?

  }  // End FormValue.setFuture()


  serialize () {

    var fVal = this;

    return {
      current:  fVal.current,
      future:   fVal.future,
      futureWasChanged: fVal._futureWasChanged
    };

  }  // End FormValue.serialize()


  // Is this how deserialization works?
  static deserialize ( obj ) {

    var fVal = new FormValue( obj.name, obj.current, obj.validate );
    if ( obj.futureWasChanged ) {
      fVal.setFuture( obj.future );
    }

    return fVal;

  }  // End FormValue.deserialize()

};  // End FormValue{}


export { FormValue };
