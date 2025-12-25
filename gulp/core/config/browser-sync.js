// utils
const deepMerge = require('../utils/deepMerge');

/**
 * BrowserSync
 * configuration
 * object
 * 
 * Uncomment and configure the proxy option below for WordPress development
 * Replace 'yoursite.local' with your local WordPress URL
 */
module.exports = deepMerge({
	// Proxy option for WordPress development
	// proxy: 'yoursite.local',

	// Or use 'server' for static files (not recommended for WordPress)
	// server: {
	//     baseDir: './'
	// },

	// General options
	logSnippet: false,
	ghostMode: false,
	open: false,
	notify: false, // Disable browser notification popup

	// File watching
	files: [
		'**/*.php',
		'assets/css/**/*.css',
		'assets/js/**/*.js'
	],

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
