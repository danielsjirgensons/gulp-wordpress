<?php

    class Config {
        private static $_instance = null;

        public static function instance(): self|null {
            if ( self::$_instance === null ) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        public function __construct() {
            add_filter( 'acf/settings/load_json', [ $this, 'acf_field_load_json' ] );
            add_action( 'after_setup_theme', [ $this, 'theme_translation_setup' ] );
        }

        /**
         * ACF Loading (JSON)
         *
         * @param array $paths
         *
         * @return array
         */
        public function acf_field_load_json( array $paths ): array {
            unset( $paths[0] );
            $paths[] = get_stylesheet_directory() . '/acf-json';

            return $paths;
        }

        /**
         * Translation, locale loading for theme and folder setup
         *
         * @return void
         */
        public function theme_translation_setup(): void {
            load_theme_textdomain( 'sev', get_template_directory() . '/languages' );
            $locale      = get_locale();
            $locale_file = get_template_directory() . "/languages/{$locale}.php";
            if ( is_readable( $locale_file ) ) {
                require_once( $locale_file );
            }
        }
    }
