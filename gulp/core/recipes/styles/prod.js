const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');

// utils
const pumped = require('../../utils/pumped');
const streamNotify = require('../../utils/streamNotify');

// config
const config = require('../../config/styles');

const plugins = [
	autoprefixer(config.options.autoprefixer),
	cssnano(config.options.minify)
];

/**
 * Compile SCSS to CSS
 * and Minify
 *
 */
module.exports = function () {
	return gulp.src(config.paths.src)
		.pipe(plumber())

		.pipe(sass.sync(config.options.sass).on('error', sass.logError))

		.pipe(postcss(plugins))

		.pipe(gulp.dest(config.paths.dest))
		.pipe(streamNotify(pumped('SCSS Compiled & Minified.')));
};
