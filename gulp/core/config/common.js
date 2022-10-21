// utils
var deepMerge = require('../utils/deepMerge');

/**
 * Common config
 * for all tasks
 *
 */
module.exports = deepMerge({
	paths: {
		assets: {
			src: 'src',
			dest: 'assets'
		}
	}
});