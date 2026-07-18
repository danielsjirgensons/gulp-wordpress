<?php
    /**
     * Class file autoloader
     * */
    spl_autoload_register( 'theme_class_autoload' );
    function theme_class_autoload( $class_name ): void {
        $class_file = __DIR__ . '/Classes/' . $class_name . '.php';

        if ( file_exists( $class_file ) ) {
            require_once $class_file;
        }
    }
