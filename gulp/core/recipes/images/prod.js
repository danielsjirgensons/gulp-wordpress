const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sharpOptimizeImages = require('gulp-sharp-optimize-images').default;
const notify = require('gulp-notify');

// utils
const pumped = require('../../utils/pumped');

// config
const config = require('../../config/images');

/**
 * Compress Images and
 * move them to the
 * built theme
 *
 */
module.exports = function () {
	return gulp.src(config.paths.src)
		.pipe(plumber())
		.pipe(
			sharpOptimizeImages({
				logLevel: '',
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
		.pipe(notify({
			"message": pumped("Images Compressed"),
			"onLast": true
		}));
};
