/** Handles the core of form values, including:
 * - Storing both a current and future value
 * - Tracking when the user manipulates a future value
 * - Propagating current values to future values if they
 * haven't been manipulated by the user
 * - Making this instance serializable
 * - Making sure only valid values are saved.
 * 
 * All values stored in a FormValue instance should be valid
 * 
 * There must be a better way to write that.
 * 
 * @class
 * @param {string} name - the name of the client property
 * @param {any} [val] - the initial value
 * @param {function} [makeValid] - returns a valid value no
 * matter what. Will be given the new value, the current value,
 * the string 'current' or 'future', and the `FormValue` instance.
 * 
 * @returns FormValue
 * @todo Finish description of FormValue return value
 */
class FormValue {

  constructor ( name, val = null, makeValid ) {

    var fVal = this;
    
    fVal.name = name;
    fVal._futureWasChanged = false;  // Handled internally
    fVal.makeValid = makeValid || function ( newVal ) { return newVal; };
    
    fVal.setCurrent( val );

  }  // End FormValue.constructor()


  setCurrent ( val ) {

    var fVal = this;

    // Transformer needed for parseInt and such
    fVal.current = fVal.makeValid( val, fVal.current, 'current', fVal );

    if ( !fVal._futureWasChanged ) {
      fVal.setFuture( val, true );
    }

    return fVal;  // Return valid value instead?

  }  // End FormValue.setCurrent()


  setFuture ( val, propagating ) {
    
    var fVal = this;
    // If it hasn't already been changed by the user...
    if ( !fVal._futureWasChanged ) {
      // ...mark it as changed if needed
      fVal._futureWasChanged = !propagating;
    }
    fVal.future = fVal.makeValid( val, fVal.future, 'future', fVal );
    
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

    var fVal = new FormValue( obj.name, obj.current, obj.makeValid );
    if ( obj.futureWasChanged ) {
      fVal.setFuture( obj.future );
    }

    return fVal;

  }  // End FormValue.deserialize()

};  // End FormValue{}


export { FormValue };
