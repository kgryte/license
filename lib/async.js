'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isString = require( 'validate.io-string-primitive' ),
	isFunction = require( 'validate.io-function' ),
	contains = require( 'validate.io-contains' ),
	fs = require( 'fs' ),
	path = require( 'path' ),
	mustache = require( 'mustache' ),
	noop = require( '@kgryte/noop' ),
	templates = require( './templates.js' );


// COPY //

/**
* FUNCTION: cp( dest[, opts ][, clbk ] )
*	Asynchronously creates a LICENSE file.
*
* @param {String} dest - LICENSE destination directory
* @param {Object} [opts] - function options
* @param {String} [opts.template="MIT"] - LICENSE template to use
* @param {Function} [clbk] - callback to invoke upon attempting to create a LICENSE file
*/
function cp() {
	var args = arguments,
		nargs = args.length,
		tmpl = 'MIT',
		fpath,
		dpath,
		opts,
		dest,
		clbk;

	if ( !nargs ) {
		throw new Error( 'cp()::insufficient input arguments. Must provide a file destination.' );
	}
	dest = args[ 0 ];
	if ( !isString( dest ) ) {
		throw new TypeError( 'cp()::invalid input argument. First argument must be a string primitive. Value: `' + dest + '`.' );
	}
	if ( nargs === 1 ) {
		clbk = noop;
	}
	else if ( nargs === 2 ) {
		if ( isObject( args[ 1 ] ) ) {
			opts = args[ 1 ];
			clbk = noop;
		}
		else if ( isFunction( args[ 1 ] ) ) {
			clbk = args[ 1 ];
		}
		else {
			throw new TypeError( 'cp()::invalid input argument. Second argument must either be an options object or a callback. Value: `' + args[ 1 ] + '`.' );
		}
	}
	else {
		opts = args[ 1 ];
		clbk = args[ 2 ];
		if ( !isObject( opts ) ) {
			throw new TypeError( 'cp()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( !isFunction( clbk ) ) {
			throw new TypeError( 'cp()::invalid input argument. Callback argument must be a function. Value: `' + clbk + '`.' );
		}
	}
	if ( opts ) {
		if ( opts.hasOwnProperty( 'template' ) ) {
			tmpl = opts.template;
			if ( !isString( tmpl ) ) {
				throw new TypeError( 'cp()::invalid option. Template option must be a string primitive. Option: `' + tmpl + '`.' );
			}
			if ( !contains( templates, tmpl ) ) {
				throw new Error( 'cp()::invalid option. Unrecognized template name. Must be one of [' + templates.join( ',' ) + '] Option: `' + tmpl + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'holder' ) ) {
			if ( !isString( opts.holder ) ) {
				throw new TypeError( 'cp()::invalid option. Holder option must be a string primitive. Option: `' + opts.holder + '`.' );
			}
		}
	} else {
		opts = {};
	}
	fpath = path.join( __dirname, tmpl, 'LICENSE' );
	dpath = path.join( dest, 'LICENSE' );

	fs.readFile( fpath, {'encoding':'utf8'}, onRead );

	/**
	* FUNCTION: onRead( error, file )
	*	Callback invoked upon reading a file.
	*
	* @private
	* @param {Error} error - error object
	* @param {String} file - file contents
	*/
	function onRead( error, file ) {
		var out;
		if ( error ) {
			return clbk( error );
		}
		out = mustache.render( file, {
			'holder': opts.holder,
			'year': new Date().getFullYear()
		});
		fs.writeFile( dpath, out, onWrite );
	}

	/**
	* FUNCTION: onWrite( error )
	*	Callback invoked upon writing a file.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onWrite( error ) {
		if ( error ) {
			return clbk( error );
		}
		clbk();
	}
} // end FUNCTION cp()


// EXPORTS //

module.exports = cp;
