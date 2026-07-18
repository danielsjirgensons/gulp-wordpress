/**
 * Return a function that lazily
 * requires a block only when
 * it is invoked and caches
 * it for future re-use
 *
 * @param require
 * @param path
 * @returns {Function}
 */
module.exports = function (require, path) {
	let worker = '';

	return function (...args) {
		if (!worker) {
			worker = require(path);
		}

		return worker(...args);
	};
};
