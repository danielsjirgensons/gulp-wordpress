<?php
    /**
     * Theme Functions
     * Main entry point for theme initialization
     */

    // Define constants
    const THEMEDIR = __DIR__;
    define( 'DIRURL', get_stylesheet_directory_uri() );
    const ASSETS_URL = DIRURL . '/assets';
    define( 'VERSIONS', ( wp_get_environment_type() === 'local' ) ? time() : wp_get_theme()->get( 'Version' ) );
    define( 'PRODUCTION', wp_get_environment_type() !== 'local' );

    // Error reporting in development
    if ( ! PRODUCTION ) {
        ini_set( 'display_errors', '1' );
        ini_set( 'display_startup_errors', '1' );
        error_reporting( E_ALL );
    }

    // Load required files
    require_once THEMEDIR . '/app/autoload.php';
    require_once THEMEDIR . '/app/helpers.php';

    // Initialize theme classes
    Theme::instance();
    Config::instance();
