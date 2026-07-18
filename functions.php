<?php
    declare( strict_types=1 );

    /**
     * Theme Functions
     * Main entry point for theme initialization
     */

    // Define constants
    const THEME_DIR = __DIR__;
    define( 'ASSETS_URL', get_stylesheet_directory_uri() . '/assets' );
    define( 'THEME_VERSION', wp_get_theme()->get( 'Version' ) );
    define( 'VERSIONS', ( wp_get_environment_type() === 'local' ) ? THEME_VERSION . '-dev' : THEME_VERSION );
    define( 'PRODUCTION', wp_get_environment_type() !== 'local' );

    // Error reporting in development
    if ( ! PRODUCTION ) {
        ini_set( 'display_errors', '1' );
        ini_set( 'display_startup_errors', '1' );
        error_reporting( E_ALL );
    }

    // Load required files
    require_once THEME_DIR . '/app/autoload.php';
    require_once THEME_DIR . '/app/helpers.php';

    // Initialize theme classes
    Theme::instance();
    Config::instance();
