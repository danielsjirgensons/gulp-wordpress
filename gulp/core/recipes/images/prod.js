const gulp = require('gulp');
const plumber = require('gulp-plumber');
// TODO: var squoosh = require('gulp-squoosh');
const notify = require('gulp-notify');
const path = require('path');

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

		// .pipe(
		// 	squoosh(({ width, height, size, filePath }) => ({
		// 		encodeOptions: {
		// 			...(path.extname(filePath) === ".png" ? { oxipng: {} } : { mozjpeg: {}, webp: {} }),
		// 		},
		// 	}))
		// )

		// .pipe(
		// 	squoosh(({ width, height, size, filePath }) => {
		// 		let options = {
		// 			encodeOptions: { mozjpeg: {} }
		// 		};
		//
		// 		if (path.extname(filePath) === '.jpg') {
		// 			options = {
		// 				encodeOptions: {
		// 					webp: {},
		// 					mozjpeg: {},
		// 				},
		// 			};
		// 		}
		//
		// 		if (path.extname(filePath) === '.png') {
		// 			options = {
		// 				encodeOptions: {
		// 					oxipng: {},
		// 				},
		// 				preprocessOptions: {
		// 					quant: {
		// 						enabled: true,
		// 						numColors: 16,
		// 					},
		// 				},
		// 			};
		// 		}
		//
		// 		return options;
		// 	})
		// )

		.pipe(gulp.dest(config.paths.dest))
		.pipe(notify({
			"message": pumped("Images Compressed"),
			"onLast": true
		}));
};
