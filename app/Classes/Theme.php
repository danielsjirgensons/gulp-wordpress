<?php

    class Theme {
        protected static $_instance = null;
        public string $css_path = DIRURL . '/assets/style/';
        public string $js_path = DIRURL . '/assets/js';

        public static function instance(): ?Theme {
            if ( is_null( self::$_instance ) ) {
                self::$_instance = new self();
            }

            return self::$_instance;
        }

        public function __construct() {
            global $sitepress;

            add_action( 'init', [ $this, 'theme_nav_menus' ] );
            add_action( 'after_setup_theme', [ $this, 'theme_support' ] );
            // add_action('after_setup_theme', [$this, 'theme_thumbnail_sizes']);
            add_action( 'wp_enqueue_scripts', [ $this, 'theme_script_load' ] );
            add_action( 'wp_enqueue_scripts', [ $this, 'dequeue_scripts' ], 100 );
            add_filter( 'upload_mimes', [ $this, 'cc_mime_types' ] );
            // add_action( 'widgets_init', [ $this, 'theme_widgets' ] );

            // Remove useful actions
            remove_action( 'wp_head', 'wp_generator' );
            remove_action( 'wp_head', 'auto_sizes_render_generator' );
            remove_action( 'wp_head', 'plsr_render_generator_meta_tag' );
            remove_action( 'wp_head', 'webp_uploads_render_generator' );
            remove_action( 'wp_head', [ $sitepress, 'meta_generator_tag' ] );

            remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
            remove_action( 'wp_print_styles', 'print_emoji_styles' );
        }

        /**
         * Theme support actions
         * */
        public function theme_support(): void {
            add_theme_support( 'post-thumbnails' ); // Post featured images
            add_theme_support( 'custom-logo' ); // Custom logo
            add_theme_support( 'widgets' ); // Widgets
            load_theme_textdomain( 'theme', get_template_directory() . '/languages' ); // Translations
            add_theme_support( 'html5', [ 'script', 'style' ] ); // HTML5

            // Removing useless options
            remove_image_size( '1536x1536' );
            remove_image_size( '2048x2048' );
        }

        /**
         * Loading required style/script files
         * */
        public function theme_script_load(): void {
            // Styles
            wp_enqueue_style( 'theme', $this->css_path . 'main.css', '', VERSIONS );
            // Scripts
            wp_enqueue_script( 'app', $this->js_path . 'app.js', '', VERSIONS, true );
        }

        /**
         * Unused style deregister
         * */
        public function dequeue_scripts(): void {
            // Styles
            // wp_deregister_style('handle');
            // Scripts
        }

        /**
         * Registering site menus
         * */
        public function theme_nav_menus(): void {
            if ( function_exists( 'register_nav_menus' ) ) {
                register_nav_menus( [
                    'main-menu'   => __( 'Main menu', 'textdomain' ),
                    'footer-menu' => __( 'Footer menu', 'textdomain' ),
                ] );
            }
        }

        /**
         * Register custom thumbnail sizes
         * */
        // function theme_thumbnail_sizes() {
        // 	if (function_exists('add_image_size')) {
        // 		$thumbnail_sizes = [
        // 			"image" => [1200, 700, true],
        // 			"image2" => [900, 400, true],
        // 			"image3" => [400, 200, false]
        // 		];

        // 		foreach ($thumbnail_sizes as $label => $options){
        // 			add_image_size($label, $options[0], $options[1], $options[2]);
        // 		}
        // 	}
        // }

        /**
         * Add custom file type upload
         * */
        public function cc_mime_types( $mimes ) {
            $mimes['svg'] = 'image/svg+xml';

            return $mimes;
        }

        /**
         * Registering custom widgets
         * */
        // function theme_widgets() {
        //     register_sidebar([
        //         'name'          => __('Blog Sidebar', 'textdomain'),
        //         'id'            => 'blog-sidebar',
        //         'description'   => __('Widgets for blog sidebar', 'zzlegal'),
        //         'before_widget' => '<section id="%1$s" class="widget %2$s">',
        //         'after_widget'  => '</section>',
        //         'before_title'  => '<div class="head"><h3>',
        //         'after_title'   => '</h3></div>',
        //     ]);
        // }

    }
