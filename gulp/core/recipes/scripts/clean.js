const del = require('del');

// config
const config = require('../../config/scripts');

/**
 * Delete all JS files
 * within the built theme's
 * asset directory
 *
 */
module.exports = async function () {
	await del(config.paths.clean, { force: true });
};
