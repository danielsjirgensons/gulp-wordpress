<?php
    /**
     * Outputs the theme logo
     * Uses the custom logo if set, otherwise outputs the site title
     * Caches the output for 1 hour to improve performance
     * */
    function get_page_logo(): string {
        $cache_key = 'theme_logo_html';
        $logo      = wp_cache_get( $cache_key, 'theme' );

        if ( $logo !== false ) {
            return $logo;
        }

        $custom_logo_id = get_theme_mod( 'custom_logo' );

        if ( ! empty( $custom_logo_id ) ) {
            $logo = wp_get_attachment_image( $custom_logo_id, 'full', '', [
                'alt' => get_bloginfo( 'title' ),
            ] );
        } else {
            $logo = sprintf( '<h1>%s</h1>', get_bloginfo( 'title' ) );
        }

        wp_cache_set( $cache_key, $logo, 'theme', HOUR_IN_SECONDS );

        return $logo;
    }

    /**
     * Debug function for data output
     *
     * @param mixed $output
     * @param bool  $dump
     *
     * @return void
     */
    function pre( mixed $output, bool $dump = false ): void {
        if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG || ( defined( 'PRODUCTION' ) && PRODUCTION ) ) {
            return;
        }

        echo '<pre>';
        if ( $dump ) {
            var_dump( $output );
        } else {
            print_r( $output );
        }
        echo '</pre>';
    }
