/**
 * Will validate (and set defaults for?) client properties
 */

// DATA
import { DEFAULTS } from './DEFAULTS.js';

// LOGIC
import { FormValue } from './FormValue.js';


const createNewClient = function () {

  // ========================
  // TRANSFORMERS (SCOPED)
  // ========================
  var lessThanHouseholdSize = function ( newVal, oldVal, timeframe, instance ) {

    var val   = oldVal,
        size  = cli.householdSize[ timeframe ];

    if ( isValid.positiveInteger( newVal ) && size > newVal ) {
      val = parseFloat( newVal )
    }

    return val;

  };


  // ========================
  // DEFAULT CLIENT
  // ========================
  var cli = {};

  // HOUSEHOLD
  cli.householdSize       = new FormValue( 'householdSize',       DEFAULTS.householdSize,       make.integerGreaterThan0 );
  cli.numberOfDependents  = new FormValue( 'numberOfDependents',  DEFAULTS.numberOfDependents,  lessThanHouseholdSize );

  // INCOMES
  /** 
   * @todo In components, limit input to two digits, but any
   * number of digits is valid for client object
   * `if ( ((num * 100).toFixed(5) % 1) !== 0 )`
   */
  cli.earned = new FormValue( 'earned',  DEFAULTS.earned,  make.positiveNumber );
  cli.SSI    = new FormValue( 'SSI',     DEFAULTS.SSI,     make.positiveNumber );

  return cli;

};  // End createNewClient({})




// ========================
// TRANSFORMERS (UNSCOPED)
// ========================
var make = {};

make.positiveNumber = function ( newVal, oldVal, timeframe, instance ) {

  if ( !isValid.positiveNumber( newVal ) ) { return oldVal; }
  else { return parseFloat( newVal ); }

};


make.integerGreaterThan0 = function ( newVal, oldVal, timeframe, instance ) {

  if ( !isValid.positiveInteger( newVal ) ) { return oldVal; }
  else if ( newVal < 1 ) { return oldVal; }
  else { return parseFloat( newVal ); }

};




// ========================
// VALIDATORS
// ========================
var isValid = {};
isValid.invalidPosNumRegex = /[^\d]/g;


isValid.positiveNumber = function ( str ) {

  var num = parseFloat( str );
  if ( isNaN( num ) ) { return false; }
  if ( num < 0 ) { return false; }
  if ( str.match( isValid.invalidPosNumRegex ) ) {
    return false;
  }
  
  return true;

};  // End isValid.positiveNumber()


isValid.positiveInteger = function ( str ) {

  if ( !isValid.positiveNumber( str ) ) {
    return false;
  }

  var num = parseFloat( str );
  if ( (num % 1) !== 0 ) { return false; }
  
  return true;

};  // End isValid.positiveNumber()



export { createNewClient };
