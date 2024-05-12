<?php
    /**
     * Load required
     * */
    const THEMEDIR = __DIR__;

    define( 'DIRURL', get_stylesheet_directory_uri() );
    define( 'VERSIONS', ( wp_get_environment_type() === 'local' ) ? time() : wp_get_theme()->get( 'Version' ) );
    define( 'PRODUCTION', wp_get_environment_type() !== 'local' );

    if ( ! PRODUCTION ) {
        ini_set( 'display_errors', '1' );
        ini_set( 'display_startup_errors', '1' );
        error_reporting( E_ALL );
        //show_admin_bar(false);
    }

    /**
     * Initialize required includes
     * */
    require_once THEMEDIR . '/app/autoload.php';
    require_once THEMEDIR . '/app/helpers.php';

    /**
     * Load required classes
     * */
    Theme::instance();
    Config::instance();

    /**
     * Deprecated functionality
     * */
