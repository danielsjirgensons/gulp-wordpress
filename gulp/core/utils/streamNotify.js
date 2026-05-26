const through2Import = require('through2');
const through2 = through2Import.default || through2Import;
const notifaker = require('./notifaker');

/**
 * Emit a single completion notification at the
 * end of a stream while preserving all files.
 *
 * @param {string} message
 * @returns {Transform}
 */
module.exports = function streamNotify(message) {
	return through2.obj(
		function (file, enc, callback) {
			this.push(file);
			callback();
		},
		function (callback) {
			notifaker(message);
			callback();
		}
	);
};