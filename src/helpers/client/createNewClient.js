/**
 * Will validate (and set defaults for?) client properties
 */

// DATA
import { DEFAULTS } from './DEFAULTS.js';

// LOGIC
import { FormValue } from './FormValue.js';


const createNewClient = function () {

  var cli = {};

  // HOUSEHOLD
  cli.householdSize  = new FormValue( 'householdSize', DEFAULTS.householdSize, make.positiveNumber );

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
// HELPERS
// ========================
var make = {};

make.positiveNumber = function ( newVal, oldVal, timeframe, instance ) {

  if ( !isValid.money( newVal ) ) { return oldVal; }
  else { return parseFloat( newVal ); }

};


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



export { createNewClient };
