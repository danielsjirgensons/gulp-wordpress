const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');

// utils
const pumped = require('../../utils/pumped');
const streamNotify = require('../../utils/streamNotify');

// config
const config = require('../../config/fonts');

/**
 * Move Fonts to
 * the built theme
 *
 */
module.exports = function () {
	return gulp.src(config.paths.src, { encoding: false })
		.pipe(plumber())

		.pipe(gulp.dest(config.paths.dest))
		.pipe(streamNotify(pumped('Fonts Moved')))

		.on('end', browserSync.reload);
};
