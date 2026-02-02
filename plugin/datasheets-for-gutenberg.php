<?php
/**
 * Plugin Name:       Datasheets For Gutenberg
 * Description:       Gutenberg blocks for building Datasheet templates.
 * Version:           1.0.0
 * Author:            Scerno Ltd.
 * Author URI:        https://scerno.com
 * Text Domain:       datasheets-for-gutenberg
 * Domain Path:       /languages
 * License:           GPL-2.0-or-later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Requires Plugins: datasheets
 * Text Domain: datasheets-blocks
 *
 * @package Datasheets_For_Gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Plugin constants.
define( 'DATASHEETS_GB_VERSION', '1.0.0' );
define( 'DATASHEETS_GB_DIR', plugin_dir_path( __FILE__ ) );
define( 'DATASHEETS_GB_URL', plugin_dir_url( __FILE__ ) );

// Require block registration file.
require_once DATASHEETS_GB_DIR . 'includes/register-blocks.php';
require_once DATASHEETS_GB_DIR . 'includes/field-options.php';

/**
 * Initialize plugin.
 */
function run_datasheets_for_gutenberg() {
	// Ensure the base plugin "Datasheets" is active.
	if ( ! class_exists( 'Datasheets' ) ) {
		add_action( 'admin_notices', function() {
			echo '<div class="notice notice-error"><p>' .
			     esc_html__( 'Datasheets For Gutenberg requires the Datasheets plugin to be active.', 'datasheets-for-gutenberg' ) .
			     '</p></div>';
		});
		return;
	}

	// Register blocks.
	add_action( 'init', 'datasheets_for_gutenberg_register_blocks' );
}
add_action( 'plugins_loaded', 'run_datasheets_for_gutenberg' );

