<?php
	/*
     * Outputs the theme logo
     * */
    function get_page_logo() {
        $custom_logo_id = get_theme_mod('custom_logo');

        if (!empty($custom_logo_id)) {
            return wp_get_attachment_image($custom_logo_id, 'full', '', [
                "alt" => get_bloginfo('title'),
            ]);
        } else {
            return "<h1>" . get_bloginfo('title') . "</h1>";
        }
    }

    /*
     * Debug function for data output
     * */
    function pre($output, $dump = false) {
        echo '<pre>';
        if ($dump) {
            var_dump($output);
        }
        else {
            print_r($output);
        }
        echo '</pre>';
    }