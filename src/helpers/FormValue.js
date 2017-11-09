/** Handles the core of form values, including:
 * - Storing both a current and future value
 * - Tracking when the user manipulates a future value
 * - Propagating current values to future values if they
 * haven't been manipulated
 * - Making this instance serializable
 * 
 * All values stored in a FormValue instance should be valid
 * 
 * There must be a better way to write that.
 * 
 * @class
 * @param {string} name - the name of the client property
 * @param {any} val - the initial value
 * @param {function} [makeValid] - transforms a given value into
 * a valid value
 * 
 * @returns FormValue
 * @todo Finish description of FormValue return value
 */
class FormValue {

  constructor ( name, val, makeValid ) {

    var formVal = this;

    formVal.name = name;
    // Is there a function to set this, or just `formVal.futureChanged = true;`?
    formVal.futureChanged = false;
    // Not sure about providing this default...
    formVal.makeValid = makeValid || function ( val ) { return val; };

    formVal.setCurrent( val );

  }  // End FormValue.constructor()


  setCurrent ( val ) {

    var formVal = this;

    val = formVal.makeValid( val, 'current', formVal );

    formVal.current = val;
    if ( !formVal.futureChanged ) {
      formVal.setFuture( val )
    }

    return formVal;

  }  // End FormValue.setCurrent()


  setFuture ( val ) {
    
    var formVal = this;

    val = formVal.makeValid( val, 'future', formVal );
    formVal.future = val;
    
    return formVal;

  }  // End FormValue.setFuture()


  serialize () {

    var formVal = this;

    var obj     = {};
    obj.current = formVal.current;
    obj.future  = formVal.future;
    obj.futureChanged = formVal.futureChanged;

    return obj;
  }  // End FormValue.serialize()


  deserialize ( obj, shouldSetFuture ) {

    var formVal = new FormValue( obj.name, obj.makeValid );

    formVal.futureChanged = Boolean( obj.futureChanged );
    formVal.setCurrent( obj.current || null );

    if ( shouldSetFuture ) {
      formVal.setFuture( obj.future || null );
    }

    return formVal;

  }  // End FormValue.deserialize()

};  // End FormValue{}


export { FormValue };
