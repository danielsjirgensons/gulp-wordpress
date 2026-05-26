const gulp = require('gulp');
const filter = require('gulp-filter');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

// config
const config = require('../../config/styles');

// utils
const notifaker = require('../../utils/notifaker');
const pumped = require('../../utils/pumped');
const streamNotify = require('../../utils/streamNotify');

// postcss
const plugins = [
	autoprefixer(config.options.autoprefixer)
];

/**
 * Compile SCSS to CSS,
 * create Sourcemaps
 * and trigger
 * Browser-sync
 *
 *
 */
module.exports = function () {
	const filterCSS = filter('**/*.css', { restore: true });

	return gulp.src(config.paths.src, { sourcemaps: true })
		.pipe(plumber())

		.pipe(sass.sync(config.options.sass))
		.on('error', function (error) {
			notifaker(error.message || 'SCSS compilation error');
			this.emit('end');
		})
		.pipe(postcss(plugins))

		.pipe(gulp.dest(config.paths.dest, { sourcemaps: '.' }))

		.pipe(filterCSS) // sourcemaps adds `.map` files to the gulp
		// stream, but we only want to trigger
		// Browser-sync on CSS files so we need to
		// filter the stream for the css files
		.pipe(browserSync.reload({ stream: true }))
		.pipe(filterCSS.restore)

		.pipe(streamNotify(pumped('Your SCSS is Compiled.')));
};
