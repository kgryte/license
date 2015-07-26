'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	contains = require( 'validate.io-contains' ),
	mustache = require( 'mustache' ),
	path = require( 'path' ),
	fs = require( 'fs' ),
	templates = require( './templates.js' );


// COPY //

/**
* FUNCTION: cp( dest[, opts ] )
*	Synchronously creates a LICENSE file.
*
* @param {String} dest - LICENSE destination directory
* @param {Object} [opts] - function options
* @param {String} [opts.template="MIT"] - LICENSE template to use
*/
function cp( dest, options ) {
	var tmpl = 'MIT',
		fpath,
		dpath,
		opts,
		out;

	if ( !isString( dest ) ) {
		throw new TypeError( 'cp()::invalid input argument. First argument must be a string primitive. Value: `' + dest + '`.' );
	}
	if ( arguments.length > 1 ) {
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'cp()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
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

	out = fs.readFileSync( fpath, {
		'encoding': 'utf8'
	});
	out = mustache.render( out, {
		'holder': opts.holder,
		'year': new Date().getFullYear()
	});

	fs.writeFileSync( dpath, out );
} // end FUNCTION cp()


// EXPORTS //

module.exports = cp;
