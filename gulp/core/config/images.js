// utils
const deepMerge = require('../utils/deepMerge');

// config
const assets = require('./common').paths.assets;

/**
 * Image Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		watch: [
			assets.src + '/images/**/*.{gif,ico,jpg,jpeg,png,webp,avif}',
			'!' + assets.src + '/images/sprites'
		],
		src: [
			assets.src + '/images/**/*.{gif,ico,jpg,jpeg,png,webp,avif}',
			'!' + assets.src + '/images/sprites'
		],
		dest: assets.dest + '/images',
		clean: assets.dest + '/images/**/*.{gif,ico,jpg,jpeg,png,webp,avif}'
	},
	options: {
		jpgOptions: {
			quality: 90,
			mozjpeg: true
		},
		webpOptions: {
			quality: 80,
			alsoProcessOriginal: true
		},
		pngOptions: {
			compressionLevel: 9,
			adaptiveFiltering: true
		},
		avifOptions: {
			quality: 90
		},
	}
});