<?php
/**
 * Plugin Name: Datasheets for Gutenberg
 * Description: Gutenberg blocks for the Wizzy Datasheets core plugin.
 * Version: 0.1.0
 * Requires Plugins: wizzy-datasheets
 * Text Domain: datasheets-blocks
 */

defined('ABSPATH') || exit;

add_action('plugins_loaded', function () {
    if ( ! defined('WIZZY_DATASHEETS_VERSION') ) {
        add_action('admin_notices', function () {
            echo '<div class="notice notice-error"><p>'
               . esc_html__('Wizzy Datasheets – Blocks requires the Wizzy Datasheets core plugin.', 'datasheets-blocks')
               . '</p></div>';
        });
        return;
    }
    require __DIR__ . '/includes/register-blocks.php';
});
