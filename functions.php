<?php
	//    show_admin_bar(false);
	/*
	 * Load required
	 * */
	const THEMEDIR      = __DIR__;
	
	define( "DIRURL", get_stylesheet_directory_uri() );
	define( "VERSIONS", ( wp_get_environment_type() === "local" ) ? time() : wp_get_theme()->Version );
	define( "PRODUCTION", wp_get_environment_type() !== "local" );

	if ( ! PRODUCTION ) {
		ini_set( 'display_errors', '1' );
		ini_set( 'display_startup_errors', '1' );
		error_reporting( E_ALL );
	}

	/*
	 * Initialize required includes
	 * */
	require_once THEMEDIR . "/app/Setup.php";
	require_once THEMEDIR . "/app/config.php";
	require_once THEMEDIR . "/app/helpers.php";

	/*
	 * Deprecated functionality
	 * */
