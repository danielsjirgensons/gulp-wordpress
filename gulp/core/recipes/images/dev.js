const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sharpOptimizeImages = require('gulp-sharp-optimize-images').default;
const browserSync = require('browser-sync');

// utils
const pumped = require('../../utils/pumped');
const streamNotify = require('../../utils/streamNotify');

// config
const config = require('../../config/images');

/**
 * Move Images to
 * the built theme
 *
 */
module.exports = function () {
	return gulp.src(config.paths.src)
		.pipe(plumber())
		.pipe(
			sharpOptimizeImages({
				// JPEGs > JPEG + WebP
				jpg_to_jpg: config.options.jpgOptions,
				webp: config.options.webpOptions,

				// PNGs > PNG + WebP
				png_to_png: config.options.pngOptions,

				// AVIF output
				// avif: config.options.avifOptions,
			})
		)
		.pipe(gulp.dest(config.paths.dest))
		.pipe(streamNotify(pumped('Images Moved')))

		.on('end', browserSync.reload);
};
