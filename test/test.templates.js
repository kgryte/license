/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	templates = require( './../lib/templates.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'LICENSE templates', function tests() {

	it( 'should export an array', function test() {
		expect( templates ).to.be.an( 'array' );
		assert.ok( templates.length );
	});

});
