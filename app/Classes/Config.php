<?php

    class Config {
        protected static object $_instance;

        public static function instance(): ?Config {
            if ( is_null( self::$_instance ) ) {
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
         * */
        public function acf_field_load_json( $paths ) {
            unset( $paths[0] );
            $paths[] = get_stylesheet_directory() . '/acf-json';

            return $paths;
        }

        /**
         * Load text domain translations
         * */
        public function theme_translation_setup(): void {
            load_theme_textdomain( 'theme', get_template_directory() . '/languages' );
            $locale      = get_locale();
            $locale_file = get_template_directory() . "/languages/$locale.php";
            if ( is_readable( $locale_file ) ) {
                require_once( $locale_file );
            }
        }
    }
