/** 
* TEMPLATE FOR A FILE IN './src/programs/statename/this-script.js'
* This template should help you understand how to create a benefit or
* eligibility function that returns the correct values to provide feedback
* to the user.
* 
* Stuff that isn't commented out is required.
* 
* The file references are geared towards a file in the above specified
* location. If the file structure of the project changes, this should
* be updated.
* 
* When you create your script, please delete this comment block.
*/

// DATA
// import { SOME_DATA } from '../../../data/massachusetts/2018/SOME_DATA.js';

// UTILITIES
// import { roundMoney } from '../../../utils/math';

// TO RETURN
import { Result } from '../../../utils/Result';


/** 
* Description of purpose of function with notes about helpful things like
* unusual methodology or behavior
* 
* @see sources: {@link https://...}
* @see notes: {@link https://...}
* @see codepen test: {@link https://...}
* 
* @todo Something that would need to be done
* 
* @function
* @since mm/yy
* 
* @param {object} client
* @property {object} client.neededProp1 - Description of prop
* @property {string} client.neededProp2 - Description of prop
* @property {number} [client.optionalProp3] - Description of prop
* 
* @returns {Result} (how to reference an external class is currently unknown)
*/
var getProgramNameBenefits = function ( client ) {

	// Do some calculations with client, adding helper functions
	// in here if needed.

	var result = {
		result: 'good',
		details: 'All good!',
		data: { important: 10, external: 500, info: 'ELI' }
	}

	return Result( result );
};  // End getProgramNameBenefits()


/** 
* A description here would probably be good too
* 
* @see sources: {@link https://...} - and some sources if useful
* 
* @function
* @since mm/yy
* 
* @param {string} arg1 - What I think about when I'm bored
* @param {number} arg2 - How many times did my alarm go off before I
* got out of bed this morning
* 
* @returns {boolean} punnier - whether or not I like puns
*/
// var aFunction = function ( arg1, arg2 ) {
// 	// Some useful abstracted logic
//   var punnier = false;
// 	return punnier;
// };  // End aFunction()


export { getProgramNameBenefits };
