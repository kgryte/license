/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Recursively make directories:
	mkdirp = require( 'mkdirp' ),

	// Path module:
	path = require( 'path' ),

	// Filesystem module:
	fs = require( 'fs' ),

	// Module to be tested:
	cp = require( './../lib/sync.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'sync', function tests() {

	it( 'should export a function', function test() {
		expect( cp ).to.be.a( 'function' );
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
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cp( './beep/boop', value );
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

	it( 'should create a LICENSE file in a specified directory', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath );

		bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

		assert.isTrue( bool );
	});

	it( 'should create a LICENSE file using a specified template', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'MIT'
		});

		bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

		assert.isTrue( bool );
	});

	it( 'should create a LICENSE file having a specified license holder', function test() {
		var dirpath,
			fpath1,
			fpath2,
			f1, f2;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'template': 'MIT',
			'holder': 'Jane Doe'
		});

		fpath1 = path.join( dirpath, 'LICENSE' );
		f1 = fs.readFileSync( fpath1, {
			'encoding': 'utf8'
		});

		fpath2 = path.join( __dirname, 'fixtures', 'LICENSE' );
		f2 = fs.readFileSync( fpath2, {
			'encoding': 'utf8'
		});

		assert.strictEqual( f1, f2 );
	});

	it( 'should ignore any unrecognized options', function test() {
		var dirpath,
			bool;

		dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

		mkdirp.sync( dirpath );
		cp( dirpath, {
			'beep': 'boop'
		});

		bool = fs.existsSync( path.join( dirpath, 'LICENSE' ) );

		assert.isTrue( bool );
	});

});
