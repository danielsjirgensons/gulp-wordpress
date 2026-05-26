const log = require('fancy-log');
const c = require('ansi-colors');

let notifier;
try {
	notifier = require('node-notifier');
} catch (error) {
	notifier = null;
}

/**
 * Fake the gulp-notfy functionality
 * to provide a consistent interface
 * for non-stream notifications
 *
 * @param message
 */
module.exports = function (message) {

	log(
		c.cyan('gulp-notifier'),
		'[' + c.blue('Gulp notification') + ']',
		c.green(message)
	);

	if (notifier && typeof notifier.notify === 'function') {
		notifier.notify({
			"title": "Gulp notification",
			"message": message,
			"onLast": true
		});
	}
};
