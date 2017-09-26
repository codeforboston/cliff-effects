/** For object manipulation. Transformation? */

/** 
* Add the properties from needy to giver, overwriting existing
* properties of needy if there's a conflict.
* 
* @todo Change name so it doesn't sound like destroys both objects.
*/
const merge = function ( needy, giver ) { // Function to merge all of the properties from one object into another
    for ( var key in giver ) {  needy[ key ] = giver [ key ]; }
    return  needy;
};

/** Make the first letter of a word capitalized. */
const capitalizeWord = function ( word ) {
	return word[ 0 ].toUpperCase() + word.substr( 1 );
}


export { merge, capitalizeWord };
