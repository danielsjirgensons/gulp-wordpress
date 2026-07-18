<?php
    declare( strict_types=1 );

    /**
     * PSR-4 compliant autoloader for theme classes.
     *
     * Automatically loads classes from the ProfDesigns\Theme namespace.
     * Falls back to loading global classes by name for backward compatibility.
     */
    spl_autoload_register( static function ( string $class ): void {
        // Try namespace-based loading first
        $prefix = 'ProfDesigns\\Theme\\';
        $len    = strlen( $prefix );

        if ( strncmp( $prefix, $class, $len ) === 0 ) {
            // PSR-4 namespaced class
            $relative_class = substr( $class, $len );
            $file           = __DIR__ . '/Classes/' . str_replace( '\\', '/', $relative_class ) . '.php';

            if ( file_exists( $file ) ) {
                require_once $file;

                return;
            }
        }

        // Fallback: try loading by class name only (backward compatibility)
        $class_file = __DIR__ . '/Classes/' . $class . '.php';
        if ( file_exists( $class_file ) ) {
            require_once $class_file;
        }
    } );
