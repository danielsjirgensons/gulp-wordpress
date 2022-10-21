<?php
    /*
     * ACF Loading (JSON)
     * */
    function acf_field_load_json($paths) {
        unset($paths[0]);
        $paths[] = get_stylesheet_directory() . '/acf-json';

        return $paths;
    }
    add_filter('acf/settings/load_json', 'acf_field_load_json');

    /*
     * Load text domain translations
     * */
    function theme_translation_setup() {
        load_theme_textdomain('zzlegal', get_template_directory() . '/languages');
        $locale      = get_locale();
        $locale_file = get_template_directory() . "/languages/$locale.php";
        if (is_readable($locale_file)) {
            require_once($locale_file);
        }
    }
    add_action('after_setup_theme', 'theme_translation_setup');
