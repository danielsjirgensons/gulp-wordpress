<?php
    /**
     * Class file autoloader
     * */
    spl_autoload_register( 'theme_class_autoload' );
    function theme_class_autoload( $class_name ): void {
        $files = glob( __DIR__ . '/Classes/*.php' );

        foreach ( $files as $file ) {
            require_once $file;
        }
    }
