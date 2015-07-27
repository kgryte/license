LICENSE
=========
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a `LICENSE` file.


## Installation

``` bash
$ npm install @kgryte/license
```


## Usage

``` javascript
var cp = require( '@kgryte/license' );
```

#### cp( dest[, opts ][, clbk ] )

Asynchronously create a `LICENSE` file in a specified `destination` directory.

``` javascript
cp( 'path/to/a/directory', onCreate );

function onCreate( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Success!' );
}
```

The function accepts the following `options`:
*	__template__: `LICENSE` template name. Default: `'MIT'`.
*	__holder__: license holder.

By default, an MIT `LICENSE` template is used. To specify a different `LICENSE` template, set the `template` option.

``` javascript
cp( 'path/to/a/directory', {
	'template': 'copyright'
});
```

To specify a license holder, set the `holder` option.

``` javascript
cp( 'path/to/a/directory', {
	'holder': 'Athan Reines'
});
```



#### cp.sync( dest[, opts] )

Synchronously create a `LICENSE` file in a specified `destination` directory.

``` javascript
cp.sync( 'path/to/a/directory' );
```

The function accepts the same `options` as the asynchronous version.


## Notes

* 	Supported templates may be found in the `./lib` directory and are named according to the directory name.


## Examples

``` javascript
var mkdirp = require( 'mkdirp' ),
	path = require( 'path' ),
	cp = require( '@kgryte/license' );

var dirpath = path.resolve( __dirname, '../build/' + new Date().getTime() );

mkdirp.sync( dirpath );
cp.sync( dirpath, {
	'template': 'MIT',
	'holder': 'Athan Reines'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

---
## CLI


### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g @kgryte/license
```


### Usage

``` bash
Usage: license [options] [destination]

Options:

  -h,    --help                Print this message.
  -V,    --version             Print the package version.
  -tmpl  --template [name]     Template name. Default: 'MIT'.
         --holder              License holder.
```


### Examples

``` bash
$ cd ~/my/project/directory
$ license
# => creates a LICENSE file in the current working directory
```

To specify a destination other than the current working directory, provide a `destination`.

``` bash
$ license ./../some/other/directory
```

To specify a license holder, set the `holder` option.

``` bash
$ license --holder='Athan Reines'
```



---
## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/@kgryte/license.svg
[npm-url]: https://npmjs.org/package/@kgryte/license

[travis-image]: http://img.shields.io/travis/kgryte/license/master.svg
[travis-url]: https://travis-ci.org/kgryte/license

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/license/master.svg
[codecov-url]: https://codecov.io/github/kgryte/license?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/license.svg
[dependencies-url]: https://david-dm.org/kgryte/license

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/license.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/license

[github-issues-image]: http://img.shields.io/github/issues/kgryte/license.svg
[github-issues-url]: https://github.com/kgryte/license/issues
