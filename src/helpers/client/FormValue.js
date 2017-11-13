/** Handles the core of form values, including:
 * - Storing both a current and future value
 * - Tracking when the user manipulates a future value
 * - Propagating current values to future values if they
 *     haven't been manipulated by the user
 * - Making this instance serializable
 * - Making sure only valid values are saved.
 * 
 * All values stored in a FormValue instance should be valid
 * 
 * There must be a better way to write that.
 * @todo Should `FormValue`s contain a reference to their
 *     client object?
 * 
 * @constructor
 * @param {string} name - the name of the client property
 * @param {any} [val] - the initial value
 * @param {function(*, *, string, FormValue): *} [makeValid] - 
 *     returns a valid value no matter what. Will be given the
 *     new value, the current value, the string 'current' or
 *     'future', and the `FormValue` instance.
 * 
 * @returns {FormValue} formVal
 * @todo Finish description of FormValue return value (tbd)
 */
class FormValue {

  constructor ( name, current, makeValid ) {

    // Set defaults
    if ( current === undefined ) { current = null; }
    this._makeValid = makeValid || function ( newVal ) { return newVal; };

    this.name = name;
    
    // Set and 'set' the starting values
    this._future = current;
    this._current = current;

  }  // End FormValue.constructor()

  
  set current ( value ) {
    this._current = this._makeValid( value, this._current, 'current', this );
    return this._current;
  }
  

  /** Getter makes sure that if another value affects this
   *     one, when that value changes this value will update itself. */
  get current () {
    this._current = this._makeValid( this._current, this._current, 'current', this );
    return this._current;
  }


  set future( value ) {
    this._future = this._makeValid( value, this._future, 'future', this );
    return this._future;
  }

  
  get future() {
    if ( this._future === null ) { return this.current; }
    else {
      this._future = this._makeValid( this._future, this._future, 'future', this );
      return this._future;
    }
  }


  serialize () {
    return {
      current: this.current,
      future: this.future,
    };
  }


  static deserialize ( obj ) {
    var formVal     = new FormValue( obj.name, obj.current, obj.makeValid );
    formVal._future = obj.future;
    return formVal;
  }  // End FormValue.deserialize()

};  // End FormValue{}


export { FormValue };
