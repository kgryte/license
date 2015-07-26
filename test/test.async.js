/* global require, describe, it */
'use strict';

var mpath = './../lib/async.js';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Recursively make directories:
	mkdirp = require( 'mkdirp' ),

	// Path module:
	path = require( 'path' ),

	// Filesystem module:
	fs = require( 'fs' ),

	// Module to proxy required modules:
	proxyquire = require( 'proxyquire' ),

	// Module to be tested:
	cp = require( mpath );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'async', function tests() {

	it( 'should export a function', function test() {
		expect( cp ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a destination', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			cp();
		}
	});

	it( 'should throw an error if not provided a valid destination directory', function test() {
		var values = [
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( value );
			};
		}
	});

	it( 'should throw an error if not provided a valid options argument', function test() {
		var values = [
			'beep',
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			// function(){} // allowed as fcn is variadic
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue1( values[i] ) ).to.throw( TypeError );
			expect( badValue2( values[i] ) ).to.throw( TypeError );
		}
		function badValue1( value ) {
			return function() {
				cp( './beep/boop', value );
			};
		}
		function badValue2( value ) {
			return function() {
				cp( './beep/boop', value, function(){} );
			};
		}
	});

	it( 'should throw an error if provided a callback argument which is not a function', function test() {
		var values = [
			'beep',
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( './beep/boop', {}, value );
			};
		}
	});

	it( 'should throw an error if provided a template option which is not a string primitive', function test() {
		var values = [
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( './beep/boop', {
					'template': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized template option', function test() {
		var values = [
			'beep',
			'boop',
			'woot'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cp( './beep/boop', {
					'template': value
				});
			};
		}
	});

	it( 'should throw an error if provided a license holder option which is not a string primitive', function test() {
		var values = [
			5,
			null,
			true,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( './beep/boop', {
					'holder': value
				});
			};
		}
	});

	it( 'should create a LICENSE file in a specified directory', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, onFinish );

		function onFinish( error ) {
			if ( error ) {
				assert.ok( false );
				return;
			}
			var bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

			assert.isTrue( bool );
		}
	});

	it( 'should pass any read errors to a provided callback', function test() {
		var dirpath,
			cp;

		cp = proxyquire( mpath, {
			'fs': {
				'readFile': function read( path, opts, clbk ) {
					clbk( new Error() );
				}
			}
		});

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		cp( dirpath, onFinish );

		function onFinish( error ) {
			if ( error ) {
				assert.ok( true );
				return;
			}
			assert.ok( false );
		}
	});

	it( 'should pass any write errors to a provided callback', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		cp( dirpath, onFinish );

		function onFinish( error ) {
			if ( error ) {
				assert.ok( true );
				return;
			}
			assert.ok( false );
		}
	});

	it( 'should create a LICENSE file in a specified directory without requiring a callback', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath );

		setTimeout( onTimeout, 500 );

		function onTimeout() {
			var bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

			assert.isTrue( bool );
		}
	});

	it( 'should create a LICENSE file using a specified template', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'MIT'
		}, onFinish );

		function onFinish( error ) {
			var bool;
			if ( error ) {
				assert.ok( false );
				return;
			}
			bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

			assert.isTrue( bool );
		}
	});

	it( 'should create a LICENSE file having a specified license holder', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'MIT',
			'holder': 'Jane Doe'
		}, onFinish );

		function onFinish( error ) {
			var fpath1,
				fpath2,
				f1, f2;

			if ( error ) {
				assert.ok( false );
				return;
			}
			fpath1 = path.join( dirpath, 'LICENSE' );
			f1 = fs.readFileSync( fpath1, {
				'encoding': 'utf8'
			});

			fpath2 = path.join( __dirname, 'fixtures', 'LICENSE' );
			f2 = fs.readFileSync( fpath2, {
				'encoding': 'utf8'
			});

			assert.strictEqual( f1, f2 );
		}
	});

	it( 'should ignore any unrecognized options', function test() {
		var dirpath;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'beep': 'boop'
		}, onFinish );

		function onFinish( error ) {
			if ( error ) {
				assert.ok( false );
				return;
			}
			var bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

			assert.isTrue( bool );
		}
	});

});
