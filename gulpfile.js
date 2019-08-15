var {gulp, src, dest, series, watch, parallel} = require('gulp')

var del = require('del')
var browserSync = require('browser-sync')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var babel = require('gulp-babel')

var settings = {
	module: 'json-to-form'
}

var paths = {
	input: './src/js/json-to-form/json-to-form.js',
	output: './dist'
}

var cleanDist = function(done) {
	del.sync([
		paths.output
	])

	done()
}

var startServer = function(done) {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})

	done()
}

var reloadBrowser = function(done) {
	browserSync.reload()

	done()
}

var watchSource = function(done) {
	watch('./', series(exports.default, reloadBrowser))

	done()
}

var jsTasks = function(done) {
	src(paths.input)
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(dest(paths.output))
		.pipe(uglify())
		.pipe(rename('json-to-form.min.js'))
		.pipe(dest(paths.output))

	done()
}

exports.default = series(
	cleanDist,
	jsTasks
)

exports.watch = series(
	exports.default,
	startServer,
	watchSource
)
