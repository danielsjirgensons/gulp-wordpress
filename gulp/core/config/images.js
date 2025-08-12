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
			assets.src + '/images/**/*.{gif,ico,jpg,jpeg,png,webp}',
			'!' + assets.src + '/images/sprites'
		],
		src: [
			assets.src + '/images/**/*.{gif,ico,jpg,jpeg,png,webp}',
			'!' + assets.src + '/images/sprites'
		],
		dest: assets.dest + '/images',
		clean: assets.dest + '/images/**/*.{gif,ico,jpg,jpeg,png,webp}'
	}
});