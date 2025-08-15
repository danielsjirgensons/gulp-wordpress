// utils
const deepMerge = require('../utils/deepMerge');

// config
const assets = require('./common').paths.assets;

/**
 * Svg Sprite Building
 * Configuration
 * Object
 *
 * @type {{}}
 */
module.exports = deepMerge({
	paths: {
		watch: assets.src + '/svg/sprite/**/*.svg',
		src: assets.src + '/svg/sprite',
		dest: assets.dest + '/svg',
		clean: assets.dest + '/svg/sprite-*.svg'
	},

	options: {
		svgmin: {
			multipass: true,
			full: true,
			plugins: [
				{ name: 'cleanupIDs', active: false }, // Keep IDs intact for potential use in CSS/JS
				{ name: 'removeXMLProcInst' }, // Remove XML processing instructions
				//{ name: 'removeXMLNS' }, // Remove redundant XML namespace declarations
				{ name: 'convertStyleToAttrs' }, // Convert <style> attributes to individual attributes
				{
					name: 'inlineStyles',
					params: {
						onlyMatchedOnce: true,
						useMqs: true,
						usePseudoElements: true
					}
				},
				{
					name: 'removeAttrs',
					params: { attrs: '(fill|stroke)' } // Remove both fill and stroke attributes
				}
			]
		},
		svgSprite: function (name) {
			return {
				shape: {
					id: { generator: 'icon-%s' }, // Prefix icon names with 'icon-'
					dimension: {
						maxWidth: 32,
						maxHeight: 32
					},
					// spacing: { padding: 5 }, // Add padding between icons
					dest: 'icons'
				},
				mode: {
					symbol: {
						inline: true, // Keep sprite inline
						dest: '.',
						sprite: 'sprite-' + name + '.svg' // Define sprite file name
					}
				}
			};
		}
	}

});
