<?php
    declare( strict_types=1 );

    /**
     * Theme helper functions.
     */

    /**
     * Outputs the theme logo.
     *
     * Uses the custom logo if set, otherwise outputs the site title.
     * Caches the output for 1 hour to improve performance.
     *
     * @return string HTML output for the logo or site title.
     */
    function get_page_logo(): string {
        $custom_logo_id = get_theme_mod( 'custom_logo' );
        $site_title     = get_bloginfo( 'title' );

        // Cache key includes logo ID and site title to invalidate on changes
        $cache_key = 'theme_logo_' . md5( $custom_logo_id . $site_title );
        $logo      = wp_cache_get( $cache_key, 'theme' );

        if ( $logo !== false ) {
            return $logo;
        }

        if ( ! empty( $custom_logo_id ) ) {
            $logo = wp_get_attachment_image( $custom_logo_id, 'full', '', [
                'alt' => esc_attr( $site_title ),
            ] );
        } else {
            $logo = sprintf( '<h1>%s</h1>', esc_html( $site_title ) );
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
