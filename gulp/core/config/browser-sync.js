// utils
const deepMerge = require('../utils/deepMerge');

/**
 * BrowserSync
 * configuration
 * object
 *
 * SETUP REQUIRED: Set the BROWSERSYNC_PROXY environment variable
 * or create a .env file with: BROWSERSYNC_PROXY=yoursite.local
 */
module.exports = deepMerge({
	// Proxy option for WordPress development
	proxy: process.env.BROWSERSYNC_PROXY || false,

	// Or use 'server' for static files (not recommended for WordPress)
	// server: {
	//     baseDir: './'
	// },

	// General options
	logSnippet: false,
	ghostMode: false,
	open: false,
	notify: false, // Disable browser notification popup

	// Reloads are triggered explicitly from gulp recipes
	// to avoid duplicate reload/injection events.

	// Browser options
	browser: 'default', // or specify: ['chrome', 'firefox']

	// Port configuration (optional)
	// port: 3000,

	// HTTPS configuration (optional)
	// https: true,

	// Snippets configuration
	snippetOptions: {
		rule: {
			match: /<\/body>/i,
			fn: function (snippet, match) {
				return snippet + match;
			}
		}
	},

	// Reload delay (ms)
	reloadDelay: 0,
	reloadDebounce: 0
});
