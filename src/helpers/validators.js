
var getMissingProps = function ( client, requiredProps ) {

	var missingProps = [];

	for ( let propi = 0; propi < requiredProps.length; propi++ ) {
		let key = requiredProps[ propi ];
		if ( client[ key ] === undefined ) { missingProps.push( key ); }
	}

	return missingProps;
};  // End getMissingProps


export { getMissingProps };
