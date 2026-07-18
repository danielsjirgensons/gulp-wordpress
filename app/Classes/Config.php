<?php
    declare( strict_types=1 );

    namespace ProfDesigns\Theme;

    /**
     * Theme configuration class.
     *
     * Handles ACF settings, translations, script management, and MIME types.
     */
    final class Config {
        private static $_instance = null;

        public static function instance(): self|null {
            if ( self::$_instance === null ) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        public function __construct() {
            global $sitepress;

            if ( function_exists( 'acf_get_setting' ) ) {
                add_filter( 'acf/settings/load_json', [ $this, 'acf_field_load_json' ] );
            }

            // Script configs
            add_action( 'wp_enqueue_scripts', [ $this, 'dequeue_scripts' ], 200 );
            add_action( 'get_footer', [ $this, 'footer_scripts' ], 100 );

            // Filters
            add_filter( 'upload_mimes', [ $this, 'cc_mime_types' ] );

            // Remove useless actions
            remove_action( 'wp_head', 'wp_generator' );
            remove_action( 'wp_head', 'auto_sizes_render_generator' );
            remove_action( 'wp_head', 'plsr_render_generator_meta_tag' );
            remove_action( 'wp_head', 'webp_uploads_render_generator' );
            if ( isset( $sitepress ) && is_object( $sitepress ) ) {
                remove_action( 'wp_head', [ $sitepress, 'meta_generator_tag' ] );
            }

            remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
            remove_action( 'wp_print_styles', 'print_emoji_styles' );
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
         * Unused style deregister
         * */
        public function dequeue_scripts(): void {
            // Styles
            //wp_dequeue_style( 'handle' );
            // Scripts
            //wp_dequeue_script( 'handle' );
        }

        /**
         * Load or move styles/scripts in footer
         * */
        public function footer_scripts(): void {
            // Styles
            wp_enqueue_style( 'handle' );

            // Scripts
            wp_enqueue_script( 'handle' );
        }

        /**
         * Add custom file type upload
         *
         * @param array $mimes
         *
         * @return array
         * */
        public function cc_mime_types( array $mimes ): array {
            $mimes['svg']  = 'image/svg+xml'; // standard
            $mimes['svgz'] = 'image/svg+xml'; // compressed SVG

            return $mimes;
        }
    }
