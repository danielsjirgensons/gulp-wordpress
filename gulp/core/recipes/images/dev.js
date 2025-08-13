const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const mergeStream = require('merge-stream');

const pumped = require('../../utils/pumped');
const config = require('../../config/images');

module.exports = async function () {
	const imagemin = (await import('gulp-imagemin')).default;
	const imageminMozjpeg = (await import('imagemin-mozjpeg')).default;
	const imageminOptipng = (await import('imagemin-optipng')).default;
	const imageminGifsicle = (await import('imagemin-gifsicle')).default;
	const imageminSvgo = (await import('imagemin-svgo')).default;

	// JPG stream
	const jpgStream = gulp.src(config.paths.src)
		.pipe(plumber())
		.pipe(imagemin([
			imageminMozjpeg({ quality: 80 })
		]))
		.pipe(gulp.dest(config.paths.dest));

	// PNG stream
	const pngStream = gulp.src(config.paths.src)
		.pipe(plumber())
		.pipe(imagemin([
			imageminOptipng({ optimizationLevel: 5 })
		]))
		.pipe(gulp.dest(config.paths.dest));

	// GIF/SVG stream
	const gifSvgStream = gulp.src(config.paths.src)
		.pipe(plumber())
		.pipe(imagemin([
			imageminGifsicle({ interlaced: true }),
			imageminSvgo()
		]))
		.pipe(gulp.dest(config.paths.dest));

	return mergeStream(jpgStream, pngStream, gifSvgStream)
		.pipe(notify({
			message: pumped("Images optimized"),
			onLast: true
		}))
		.on('end', browserSync.reload);
};
