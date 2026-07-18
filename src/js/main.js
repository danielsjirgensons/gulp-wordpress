/**
 * Main application entry point
 * Initialize all modules when DOM is ready
 */
import General from './_generalScripts';

const App = {
	/**
	 * Initialize application modules
	 */
	init() {
		// Initialize general scripts
		this.general = new General();
		
		// Add more module initializations here as needed
		// this.navigation = new Navigation();
		// this.forms = new Forms();
	}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	App.init();
});
