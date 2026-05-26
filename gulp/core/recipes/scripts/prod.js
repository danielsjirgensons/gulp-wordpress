const gulp = require('gulp');
const plumber = require('gulp-plumber');
const named = require('vinyl-named');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');

// utils
const deepMerge = require('../../utils/deepMerge');
const pumped = require('../../utils/pumped');
const streamNotify = require('../../utils/streamNotify');

// config
const config = require('../../config/scripts');

/**
 * Create minified JS
 * packages with webpack
 *
 * @returns {*}
 */
module.exports = function () {
	return gulp.src(config.paths.src)
		.pipe(plumber())

		.pipe(named()) // vinyl-named is used to allow for
		// multiple entry files
		.pipe(gulpWebpack(
			deepMerge(
				config.options.webpack.defaults,
				config.options.webpack.prod
			), webpack
		))

		.pipe(gulp.dest(config.paths.dest))
		.pipe(streamNotify(pumped('JS Packaged & Minified!')));
};
