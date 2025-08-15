// utils
const deepMerge = require('../utils/deepMerge');

// config
const assets = require('./common').paths.assets;

/**
 * Svg Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		watch: [
			assets.src + '/svg/**/*.svg',
			'!' + assets.src + '/svg/sprite/**/*.svg'
		],
		src: [
			assets.src + '/svg/**/*.svg',
			'!' + assets.src + '/svg/sprite/**/*.svg'
		],
		dest: assets.dest + '/svg',
		clean: [
			assets.dest + '/svg/**/*.svg',
			'!' + assets.dest + '/svg/sprite-*.svg'
		]
	},

	options: {
		svgmin: {
			multipass: true, // Run minification multiple times for the best results
			plugins: [
				{ name: 'preset-default' }, // Use the default preset
				{ name: 'removeTitle' }, // Remove <title> elements
				{ name: 'removeDesc' }, // Remove <desc> elements
				{ name: 'removeMetadata' }, // Remove metadata
				{ name: 'cleanupAttrs' }, // Clean up redundant or unnecessary attributes
				{ name: 'removeUselessDefs' }, // Remove unused <defs> elements
				{ name: 'removeXMLProcInst' }, // Remove XML processing instructions
				{ name: 'removeComments' } // Remove comments
			]
		}
	}
});